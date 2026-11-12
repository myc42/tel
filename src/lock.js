import { $, emit } from "./utils.js";
import { S } from "./state.js";
import { closeApp } from "./nav.js";

export const unlock = () => {
  const l = $("#lock");
  l.classList.remove("drag"); l.style.transform = "translateY(-105%)";
  S.locked = false; emit("unlock");
};

/* Écran verrouillé : balayage vers le haut (ou simple tap) */
export function initLock() {
  const lock = $("#lock"); let y0 = null;

  lock.addEventListener("pointerdown", e => { if (e.target.closest("button")) return; y0 = e.clientY; lock.classList.add("drag"); lock.setPointerCapture(e.pointerId); });
  lock.addEventListener("pointermove", e => { if (y0 !== null) lock.style.transform = `translateY(${Math.min(0, e.clientY - y0)}px)`; });
  lock.addEventListener("pointerup", e => {
    if (y0 === null) return;
    const d = e.clientY - y0; y0 = null; lock.classList.remove("drag");
    d < -120 || Math.abs(d) < 6 ? unlock() : (lock.style.transform = "");
  });
  lock.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") unlock(); });

  $("#torch").addEventListener("click", e => ["bg-black/40", "bg-white", "text-white", "text-black"].forEach(c => e.currentTarget.classList.toggle(c)));
  $("#bar").addEventListener("click", () => S.locked ? unlock() : closeApp());
}
