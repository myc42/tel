import { D } from "./data.js";
import { $, bg, hm } from "./utils.js";

/* Appareil photo : vraie caméra si autorisée */
let cam = null;

export const stopCam = () => { cam?.getTracks().forEach(t => t.stop()); cam = null; };

export async function startCam() {
  try {
    const m = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
    if (!$("#cam")) return m.getTracks().forEach(t => t.stop());
    cam = m; $("#cam").srcObject = m;
  } catch {
    const e = $("#camMsg"); if (e) e.textContent = "Autorise l’accès à la caméra pour prendre des photos.";
  }
}

export function shot() {
  const f = $("#flash"), v = $("#cam"); f.style.opacity = 1; setTimeout(() => f.style.opacity = 0, 120);
  if (!v.videoWidth) return;
  const c = document.createElement("canvas"); c.width = v.videoWidth; c.height = v.videoHeight;
  c.getContext("2d").drawImage(v, 0, 0);
  D.gallery.unshift({ src: c.toDataURL("image/jpeg", .85), date: "Aujourd’hui à " + hm(new Date()) });
  $("#thumb").style.cssText = bg(D.gallery[0]);
}
