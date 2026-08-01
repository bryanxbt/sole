const ID_KEY = "sole.dodgeball.playerId.v1";
const NAME_KEY = "sole.dodgeball.guestName.v1";

export function getPlayerId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(ID_KEY);
  if (!id) {
    id = `sole_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(ID_KEY, id);
  }
  return id;
}

export function getGuestName(): string {
  if (typeof window === "undefined") return "PEPE";
  let name = localStorage.getItem(NAME_KEY);
  if (!name) {
    name = `PEPE-${Math.floor(1000 + Math.random() * 9000)}`;
    localStorage.setItem(NAME_KEY, name);
  }
  return name;
}
