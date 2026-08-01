/**
 * 1v1 Sole Dodgeball matchmaking + host-sim via PeerJS.
 */

import type { InputCmd, MatchState } from "./logic";
import { createMatch, stepMatch } from "./logic";

const SEAT_PREFIX = "sole-dodge-1v1-v1-";
const SEAT_COUNT = 6;

export type LobbyView = {
  status: "connecting" | "queued" | "playing" | "finished" | "error" | "practice";
  message: string;
  match: MatchState | null;
  role: "host" | "guest" | "practice" | null;
};

type Seat = { id: string; name: string };

type Wire =
  | { type: "hello"; seat: Seat }
  | { type: "state"; match: MatchState }
  | { type: "input"; input: InputCmd }
  | { type: "ping" };

export type DodgeHandle = {
  destroy: () => void;
  sendInput: (input: InputCmd) => void;
  role: () => LobbyView["role"];
};

export async function joinDodgeball1v1(opts: {
  playerId: string;
  name: string;
  practice?: boolean;
  onView: (v: LobbyView) => void;
}): Promise<DodgeHandle> {
  if (opts.practice) return joinPractice(opts);

  const me: Seat = { id: opts.playerId, name: opts.name };
  let destroyed = false;
  let role: LobbyView["role"] = null;
  let match: MatchState | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let peer: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let conn: any = null;
  let hostLoop: number | null = null;
  const remoteInput: { current: InputCmd | null } = { current: null };
  const localInput: { current: InputCmd | null } = { current: null };

  const emit = (
    status: LobbyView["status"],
    message: string,
    m: MatchState | null = match,
  ) => {
    if (destroyed) return;
    opts.onView({ status, message, match: m, role });
  };

  const send = (msg: Wire) => {
    try {
      if (conn?.open) conn.send(msg);
    } catch {
      /* ignore */
    }
  };

  const startHostSim = (p1: Seat, p2: Seat) => {
    match = createMatch(p1, p2);
    role = "host";
    emit("playing", "LIVE · 1v1", match);
    send({ type: "state", match });

    const tick = () => {
      if (destroyed || !match || match.phase === "finished") {
        if (match?.phase === "finished") {
          emit("finished", "MATCH OVER", match);
          send({ type: "state", match });
        }
        return;
      }
      const inputs: InputCmd[] = [];
      if (localInput.current) inputs.push(localInput.current);
      if (remoteInput.current) inputs.push(remoteInput.current);
      match = stepMatch(match, inputs);
      // clear throw edges
      if (localInput.current) localInput.current = { ...localInput.current, throw: false };
      if (remoteInput.current) remoteInput.current = { ...remoteInput.current, throw: false };

      send({ type: "state", match });
      emit(
        match.phase === "finished" ? "finished" : "playing",
        match.phase === "countdown" ? `GET READY ${match.countdown}` : "LIVE · 1v1",
        match,
      );
      hostLoop = window.setTimeout(tick, 1000 / 60);
    };
    hostLoop = window.setTimeout(tick, 1000 / 60);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wire = (c: any, asHost: boolean) => {
    conn = c;
    c.on("data", (raw: unknown) => {
      const msg = raw as Wire;
      if (!msg?.type) return;
      if (msg.type === "hello" && asHost && !match) {
        startHostSim(me, msg.seat);
        return;
      }
      if (msg.type === "state" && !asHost) {
        match = msg.match;
        role = "guest";
        emit(
          msg.match.phase === "finished" ? "finished" : "playing",
          msg.match.phase === "countdown"
            ? `GET READY ${msg.match.countdown}`
            : "LIVE · 1v1",
          msg.match,
        );
        return;
      }
      if (msg.type === "input" && asHost) {
        remoteInput.current = msg.input;
        return;
      }
      if (msg.type === "ping" && !asHost) {
        send({ type: "hello", seat: me });
      }
    });
    c.on("close", () => {
      if (!destroyed && match?.phase !== "finished") {
        emit("error", "OPPONENT LEFT THE COURT", null);
      }
    });
    const onOpen = () => {
      if (asHost) {
        emit("queued", "OPPONENT LINKED…", null);
        send({ type: "ping" });
      } else {
        send({ type: "hello", seat: me });
        emit("queued", "JOINED · WAITING FOR HOST…", null);
      }
    };
    if (c.open) onOpen();
    else c.on("open", onOpen);
  };

  emit("connecting", "FINDING A COURT…", null);

  try {
    const PeerCtor = (await import("peerjs")).default;

    const connectGuest = (i: number) =>
      new Promise<boolean>((resolve) => {
        const hostId = `${SEAT_PREFIX}${i}`;
        const p = new PeerCtor({ debug: 0 });
        let done = false;
        const fin = (ok: boolean) => {
          if (done) return;
          done = true;
          if (!ok) {
            try {
              p.destroy();
            } catch {
              /* */
            }
            if (peer === p) peer = null;
          }
          resolve(ok);
        };
        p.on("open", () => {
          peer = p;
          const c = p.connect(hostId, { reliable: true });
          c.on("open", () => {
            role = "guest";
            wire(c, false);
            fin(true);
          });
          c.on("error", () => fin(false));
          window.setTimeout(() => fin(false), 5000);
        });
        p.on("error", () => fin(false));
        window.setTimeout(() => fin(false), 7000);
      });

    const claimHost = (i: number) =>
      new Promise<"host" | "taken">((resolve) => {
        const id = `${SEAT_PREFIX}${i}`;
        const p = new PeerCtor(id, { debug: 0 });
        let done = false;
        const fin = (r: "host" | "taken") => {
          if (done) return;
          done = true;
          resolve(r);
        };
        p.on("open", () => {
          peer = p;
          role = "host";
          fin("host");
        });
        p.on("error", (e: { type?: string }) => {
          if (e.type === "unavailable-id") {
            try {
              p.destroy();
            } catch {
              /* */
            }
            fin("taken");
          }
        });
        window.setTimeout(() => {
          if (!done) {
            try {
              p.destroy();
            } catch {
              /* */
            }
            fin("taken");
          }
        }, 4500);
      });

    let linked = false;
    for (let i = 0; i < SEAT_COUNT && !linked && !destroyed; i++) {
      emit("connecting", `SCANNING COURT ${i + 1}…`, null);
      if (await connectGuest(i)) {
        linked = true;
        break;
      }
    }
    for (let i = 0; i < SEAT_COUNT && !linked && !destroyed; i++) {
      emit("connecting", `OPENING COURT ${i + 1}…`, null);
      const r = await claimHost(i);
      if (r === "host" && peer) {
        emit("queued", "WAITING FOR OPPONENT…", null);
        peer.on("connection", (c: unknown) => {
          if (match) return;
          wire(c, true);
        });
        linked = true;
        break;
      }
    }
    if (!linked) emit("error", "NO COURT AVAILABLE — TRY PRACTICE", null);
  } catch {
    emit("error", "LINK FAILED — TRY PRACTICE", null);
  }

  return {
    destroy: () => {
      destroyed = true;
      if (hostLoop) window.clearTimeout(hostLoop);
      try {
        conn?.close();
      } catch {
        /* */
      }
      try {
        peer?.destroy();
      } catch {
        /* */
      }
    },
    role: () => role,
    sendInput: (input: InputCmd) => {
      localInput.current = input;
      if (role === "guest") {
        send({ type: "input", input });
      }
    },
  };
}

function joinPractice(opts: {
  playerId: string;
  name: string;
  onView: (v: LobbyView) => void;
}): DodgeHandle {
  let match = createMatch(
    { id: opts.playerId, name: opts.name },
    { id: "cpu", name: "ARCH-BOT" },
  );
  let destroyed = false;
  let local: InputCmd | null = null;
  let loop: number | null = null;

  const tick = () => {
    if (destroyed) return;
    // simple bot: track player y, throw occasionally
    const bot: InputCmd = {
      playerId: "cpu",
      up: match.p1.y < match.p2.y - 8,
      down: match.p1.y > match.p2.y + 8,
      aimX: match.p1.x,
      aimY: match.p1.y,
      throw: match.tick % 90 === 0,
    };
    const inputs: InputCmd[] = [];
    if (local) inputs.push(local);
    inputs.push(bot);
    match = stepMatch(match, inputs);
    if (local) local = { ...local, throw: false };
    opts.onView({
      status: match.phase === "finished" ? "finished" : "practice",
      message:
        match.phase === "finished"
          ? match.winnerId === opts.playerId
            ? "YOU WIN"
            : "ARCH-BOT WINS"
          : match.phase === "countdown"
            ? `GET READY ${match.countdown}`
            : "PRACTICE · 1v1",
      match,
      role: "practice",
    });
    if (match.phase !== "finished") loop = window.setTimeout(tick, 1000 / 60);
  };
  opts.onView({
    status: "practice",
    message: "PRACTICE · 1v1",
    match,
    role: "practice",
  });
  loop = window.setTimeout(tick, 1000 / 60);

  return {
    destroy: () => {
      destroyed = true;
      if (loop) window.clearTimeout(loop);
    },
    role: () => "practice",
    sendInput: (input) => {
      local = input;
    },
  };
}
