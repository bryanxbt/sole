"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { arcadeColors } from "@/lib/esports/brand";
import { getGuestName, getPlayerId } from "@/lib/esports/player";
import { ARENA, PHYSICS, type InputCmd, type MatchState } from "./logic";
import { joinDodgeball1v1, type DodgeHandle, type LobbyView } from "./net";

type Phase = "entry" | "matchmaking" | "live";

/**
 * Sole Dodgeball — 1v1 live (PeerJS) + practice.
 * Arch cream/orange/indigo, pixel court, arcade insert flow.
 */
export function DodgeballGame({
  onExit,
  source = "sole",
}: {
  onExit?: () => void;
  source?: "sole" | "coinup";
}) {
  const [phase, setPhase] = useState<Phase>("entry");
  const [view, setView] = useState<LobbyView>({
    status: "connecting",
    message: "…",
    match: null,
    role: null,
  });
  const handleRef = useRef<DodgeHandle | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});
  const mouse = useRef({ x: ARENA.w / 2, y: ARENA.h / 2, throw: false });

  const cleanup = useCallback(() => {
    handleRef.current?.destroy();
    handleRef.current = null;
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const startLive = async () => {
    cleanup();
    setPhase("matchmaking");
    const handle = await joinDodgeball1v1({
      playerId: getPlayerId(),
      name: getGuestName(),
      practice: false,
      onView: (v) => {
        setView(v);
        if (v.status === "playing" || v.status === "practice" || v.status === "finished") {
          setPhase("live");
        }
        if (v.status === "error") setPhase("matchmaking");
      },
    });
    handleRef.current = handle;
  };

  const startPractice = async () => {
    cleanup();
    setPhase("live");
    const handle = await joinDodgeball1v1({
      playerId: getPlayerId(),
      name: getGuestName(),
      practice: true,
      onView: setView,
    });
    handleRef.current = handle;
  };

  // Input loop → host/guest
  useEffect(() => {
    if (phase !== "live") return;
    const id = window.setInterval(() => {
      const me = getPlayerId();
      const k = keys.current;
      const input: InputCmd = {
        playerId: me,
        up: k["w"] || k["arrowup"],
        down: k["s"] || k["arrowdown"],
        left: k["a"] || k["arrowleft"],
        right: k["d"] || k["arrowright"],
        aimX: mouse.current.x,
        aimY: mouse.current.y,
        throw: mouse.current.throw || k[" "],
      };
      mouse.current.throw = false;
      handleRef.current?.sendInput(input);
    }, 1000 / 30);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Draw
  useEffect(() => {
    const m = view.match;
    const canvas = canvasRef.current;
    if (!canvas || !m) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawCourt(ctx, m, getPlayerId());
  }, [view.match]);

  return (
    <div className="db-shell">
      <header className="db-top">
        <div>
          <p className="db-kicker">$SOLE E-SPORTS</p>
          <h1 className="db-title">SOLE DODGEBALL</h1>
        </div>
        <p className="db-tag">{view.message || "INSERT SUPPORT"}</p>
      </header>

      {phase === "entry" && (
        <div className="db-entry">
          <p className="db-entry-line">1v1 LIVE · FIRST TO 3 HITS</p>
          <p className="db-entry-sub">
            Arch colors. Pixel court. No bridges. No wraps. Just support.
          </p>
          <button type="button" className="db-btn db-btn--primary" onClick={() => void startLive()}>
            INSERT SUPPORT · FIND OPPONENT
          </button>
          <button type="button" className="db-btn" onClick={() => void startPractice()}>
            PRACTICE VS ARCH-BOT
          </button>
          {onExit && (
            <button type="button" className="db-btn db-btn--ghost" onClick={onExit}>
              BACK
            </button>
          )}
          <p className="db-source">
            ENTRY · {source === "coinup" ? "COINUP CABINET" : "SOLE PORTAL"}
          </p>
        </div>
      )}

      {phase === "matchmaking" && (
        <div className="db-entry">
          <p className="db-entry-line">{view.message}</p>
          <p className="db-entry-sub">
            Open another browser / incognito and hit FIND OPPONENT too.
          </p>
          <button type="button" className="db-btn" onClick={() => void startPractice()}>
            PRACTICE VS ARCH-BOT
          </button>
          <button
            type="button"
            className="db-btn db-btn--ghost"
            onClick={() => {
              cleanup();
              setPhase("entry");
            }}
          >
            CANCEL
          </button>
        </div>
      )}

      {(phase === "live" || view.match) && view.match && (
        <div className="db-stage">
          <div className="db-hud">
            <span className="db-hud-p1">
              {view.match.p1.name} · {view.match.p1Hits} HITS · ❤{view.match.p1.lives}
            </span>
            <span className="db-hud-mid">
              {view.match.phase === "countdown"
                ? view.match.countdown
                : view.match.phase === "finished"
                  ? "FINAL"
                  : "LIVE"}
            </span>
            <span className="db-hud-p2">
              ❤{view.match.p2.lives} · {view.match.p2Hits} HITS · {view.match.p2.name}
            </span>
          </div>
          <canvas
            ref={canvasRef}
            width={ARENA.w}
            height={ARENA.h}
            className="db-canvas"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const sx = ARENA.w / rect.width;
              const sy = ARENA.h / rect.height;
              mouseAim(mouse, e.clientX - rect.left, e.clientY - rect.top, sx, sy);
            }}
            onMouseDown={() => {
              mouse.current.throw = true;
            }}
          />
          <p className="db-help">
            WASD / ARROWS MOVE · MOUSE AIM · CLICK OR SPACE THROW · STAY ON YOUR HALF
          </p>
          {view.status === "finished" && (
            <div className="db-final">
              <p>
                {view.match.winnerId === getPlayerId() ? "VICTORY" : "DEFEAT"}
              </p>
              <button type="button" className="db-btn db-btn--primary" onClick={() => void startLive()}>
                FIND ANOTHER
              </button>
              <button type="button" className="db-btn" onClick={() => void startPractice()}>
                PRACTICE
              </button>
            </div>
          )}
          {view.status === "error" && (
            <p className="db-error">{view.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

function mouseAim(
  mouse: { current: { x: number; y: number; throw: boolean } },
  mx: number,
  my: number,
  sx: number,
  sy: number,
) {
  mouse.current.x = mx * sx;
  mouse.current.y = my * sy;
}

function drawCourt(
  ctx: CanvasRenderingContext2D,
  m: MatchState,
  localId: string,
) {
  const { cream, orange, indigo, indigoMid, p1, p2, ball } = arcadeColors;
  const { w, h } = m.arena;

  // court floor — indigo
  ctx.fillStyle = indigo;
  ctx.fillRect(0, 0, w, h);

  // pixel grid
  ctx.strokeStyle = "rgba(243,239,215,0.06)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // halves
  ctx.fillStyle = "rgba(236,100,29,0.08)";
  ctx.fillRect(0, 0, w / 2, h);
  ctx.fillStyle = "rgba(243,239,215,0.05)";
  ctx.fillRect(w / 2, 0, w / 2, h);

  // center line
  ctx.strokeStyle = cream;
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(w / 2, 8);
  ctx.lineTo(w / 2, h - 8);
  ctx.stroke();
  ctx.setLineDash([]);

  // border
  ctx.strokeStyle = orange;
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, w - 4, h - 4);

  // players
  drawPlayer(ctx, m.p1, p1, m.p1.id === localId);
  drawPlayer(ctx, m.p2, p2, m.p2.id === localId);

  // balls
  for (const b of m.balls) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, PHYSICS.BALL_R, 0, Math.PI * 2);
    ctx.fillStyle = ball;
    ctx.fill();
    ctx.strokeStyle = indigoMid;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  if (m.phase === "countdown") {
    ctx.fillStyle = "rgba(26,22,48,0.55)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = orange;
    ctx.font = "bold 64px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(Math.max(1, m.countdown)), w / 2, h / 2);
  }
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  pl: { x: number; y: number; aim: number; name: string },
  color: string,
  isLocal: boolean,
) {
  const r = PHYSICS.PLAYER_R;
  ctx.beginPath();
  ctx.arc(pl.x, pl.y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = isLocal ? "#fff" : arcadeColors.indigoMid;
  ctx.lineWidth = isLocal ? 3 : 2;
  ctx.stroke();
  // aim
  ctx.beginPath();
  ctx.moveTo(pl.x, pl.y);
  ctx.lineTo(pl.x + Math.cos(pl.aim) * (r + 12), pl.y + Math.sin(pl.aim) * (r + 12));
  ctx.strokeStyle = arcadeColors.cream;
  ctx.lineWidth = 2;
  ctx.stroke();
}
