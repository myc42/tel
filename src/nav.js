import { $, emit, esc } from "./utils.js";
import { CH, APPS } from "./icons.js";
import { V } from "./views/index.js";
import { stopCam } from "./cam.js";

/* Pile de navigation : [{ k: "vue:arg", t: "titre" }, …] */
let stack = [];

export const current = () => stack.at(-1);

export function show() {
  const s = stack.at(-1), [k, a] = s.k.split(":"), v = V[k](a), pv = stack.at(-2);
  s.t = v.t;
  $("#hTitle").textContent = v.large ? "" : v.t;
  $("#hdr").hidden = !!(v.full || v.nohdr);
  $("#back").innerHTML = CH + (pv ? esc(pv.t) : "Accueil");
  $("#fback").style.display = v.full && !v.nofb ? "flex" : "none";
  $("#body").innerHTML = v.h; $("#body").scrollTop = 0;
  if (k !== "camera") stopCam();
  v.after?.();
  emit("view", k);
}

/* Aller plus loin (ajoute une vue) / repartir de zéro sur une vue (onglets) */
export const push = k => { stack.push({ k, t: "" }); show(); };
export const reset = k => { stack = [{ k, t: "" }]; show(); };

export function openApp(id, el) {
  const p = $("#phone").getBoundingClientRect(), r = el.getBoundingClientRect(), a = $("#app");
  a.style.transformOrigin = `${r.left + r.width / 2 - p.left}px ${r.top + r.height / 2 - p.top}px`;
  a.style.setProperty("--ac", APPS[id][1]);
  stack = [{ k: id, t: "" }]; show(); a.classList.add("open"); emit("open", id);
}

export function closeApp() {
  $("#app").classList.remove("open"); stack = []; stopCam(); emit("close");
}

export const goBack = () => { stack.pop(); stack.length ? show() : closeApp(); };
