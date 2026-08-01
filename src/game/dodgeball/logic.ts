/** Pure 1v1 dodgeball simulation — host authority. */

export type Vec = { x: number; y: number };

export type PlayerState = {
  id: string;
  name: string;
  x: number;
  y: number;
  /** facing / aim radians */
  aim: number;
  lives: number;
  cooldown: number;
  team: 0 | 1;
};

export type BallState = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ownerId: string | null;
  /** frames alive */
  age: number;
};

export type GamePhase = "countdown" | "playing" | "finished";

export type MatchState = {
  phase: GamePhase;
  countdown: number;
  p1: PlayerState;
  p2: PlayerState;
  balls: BallState[];
  winnerId: string | null;
  tick: number;
  /** first to this many lives remaining loss... actually first to deal N hits */
  hitsToWin: number;
  p1Hits: number;
  p2Hits: number;
  arena: { w: number; h: number };
};

export const ARENA = { w: 480, h: 320 };
const PLAYER_R = 14;
const BALL_R = 8;
const SPEED = 2.8;
const THROW_SPEED = 6.2;
const COOLDOWN = 45; // frames ~0.75s at 60fps
const MAX_BALL_AGE = 180;

export function createMatch(
  p1: { id: string; name: string },
  p2: { id: string; name: string },
): MatchState {
  return {
    phase: "countdown",
    countdown: 3,
    p1: {
      id: p1.id,
      name: p1.name,
      x: ARENA.w * 0.22,
      y: ARENA.h * 0.5,
      aim: 0,
      lives: 3,
      cooldown: 0,
      team: 0,
    },
    p2: {
      id: p2.id,
      name: p2.name,
      x: ARENA.w * 0.78,
      y: ARENA.h * 0.5,
      aim: Math.PI,
      lives: 3,
      cooldown: 0,
      team: 1,
    },
    balls: [],
    winnerId: null,
    tick: 0,
    hitsToWin: 3,
    p1Hits: 0,
    p2Hits: 0,
    arena: { ...ARENA },
  };
}

export type InputCmd = {
  playerId: string;
  up?: boolean;
  down?: boolean;
  left?: boolean;
  right?: boolean;
  throw?: boolean;
  aimX?: number;
  aimY?: number;
};

let ballSeq = 1;

export function stepMatch(
  state: MatchState,
  inputs: InputCmd[],
): MatchState {
  const s = structuredClone(state) as MatchState;
  s.tick += 1;

  if (s.phase === "countdown") {
    if (s.tick % 60 === 0) s.countdown -= 1;
    if (s.countdown <= 0) {
      s.phase = "playing";
      s.countdown = 0;
    }
    return s;
  }

  if (s.phase === "finished") return s;

  const byId = new Map(inputs.map((i) => [i.playerId, i]));
  applyInput(s.p1, byId.get(s.p1.id), s);
  applyInput(s.p2, byId.get(s.p2.id), s);

  // balls
  for (const b of s.balls) {
    b.age += 1;
    b.x += b.vx;
    b.y += b.vy;
    // walls
    if (b.x < BALL_R || b.x > ARENA.w - BALL_R) b.vx *= -1;
    if (b.y < BALL_R || b.y > ARENA.h - BALL_R) b.vy *= -1;
    b.x = clamp(b.x, BALL_R, ARENA.w - BALL_R);
    b.y = clamp(b.y, BALL_R, ARENA.h - BALL_R);
  }
  s.balls = s.balls.filter((b) => b.age < MAX_BALL_AGE);

  // collisions ball → player
  for (const b of [...s.balls]) {
    for (const pl of [s.p1, s.p2]) {
      if (b.ownerId === pl.id && b.age < 12) continue; // grace after throw
      const d = dist(b.x, b.y, pl.x, pl.y);
      if (d < PLAYER_R + BALL_R) {
        // hit
        if (pl.id === s.p1.id) {
          s.p2Hits += 1;
          s.p1.lives = Math.max(0, s.p1.lives - 1);
        } else {
          s.p1Hits += 1;
          s.p2.lives = Math.max(0, s.p2.lives - 1);
        }
        s.balls = s.balls.filter((x) => x.id !== b.id);
        // knockback
        const ang = Math.atan2(pl.y - b.y, pl.x - b.x);
        pl.x += Math.cos(ang) * 10;
        pl.y += Math.sin(ang) * 10;
        clampPlayer(pl);
      }
    }
  }

  if (s.p1Hits >= s.hitsToWin || s.p1.lives <= 0) {
    s.phase = "finished";
    s.winnerId = s.p2.id;
  } else if (s.p2Hits >= s.hitsToWin || s.p2.lives <= 0) {
    s.phase = "finished";
    s.winnerId = s.p1.id;
  }

  return s;
}

function applyInput(pl: PlayerState, input: InputCmd | undefined, s: MatchState) {
  if (pl.cooldown > 0) pl.cooldown -= 1;
  if (!input) return;

  let dx = 0;
  let dy = 0;
  if (input.left) dx -= 1;
  if (input.right) dx += 1;
  if (input.up) dy -= 1;
  if (input.down) dy += 1;
  if (dx || dy) {
    const len = Math.hypot(dx, dy) || 1;
    pl.x += (dx / len) * SPEED;
    pl.y += (dy / len) * SPEED;
  }

  // side lock: p1 left half, p2 right half (classic gym dodgeball)
  if (pl.team === 0) {
    pl.x = clamp(pl.x, PLAYER_R + 4, ARENA.w / 2 - PLAYER_R - 4);
  } else {
    pl.x = clamp(pl.x, ARENA.w / 2 + PLAYER_R + 4, ARENA.w - PLAYER_R - 4);
  }
  pl.y = clamp(pl.y, PLAYER_R + 4, ARENA.h - PLAYER_R - 4);

  if (input.aimX != null && input.aimY != null) {
    pl.aim = Math.atan2(input.aimY - pl.y, input.aimX - pl.x);
  }

  if (input.throw && pl.cooldown <= 0) {
    pl.cooldown = COOLDOWN;
    s.balls.push({
      id: ballSeq++,
      x: pl.x + Math.cos(pl.aim) * (PLAYER_R + 4),
      y: pl.y + Math.sin(pl.aim) * (PLAYER_R + 4),
      vx: Math.cos(pl.aim) * THROW_SPEED,
      vy: Math.sin(pl.aim) * THROW_SPEED,
      ownerId: pl.id,
      age: 0,
    });
  }
}

function clampPlayer(pl: PlayerState) {
  if (pl.team === 0) {
    pl.x = clamp(pl.x, PLAYER_R + 4, ARENA.w / 2 - PLAYER_R - 4);
  } else {
    pl.x = clamp(pl.x, ARENA.w / 2 + PLAYER_R + 4, ARENA.w - PLAYER_R - 4);
  }
  pl.y = clamp(pl.y, PLAYER_R + 4, ARENA.h - PLAYER_R - 4);
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

export const PHYSICS = { PLAYER_R, BALL_R };
