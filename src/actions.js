import { D } from "./data.js";
import { S } from "./state.js";
import { $ } from "./utils.js";
import { PLAY, PAUSE } from "./icons.js";
import { show, push, reset, openApp, goBack } from "./nav.js";
import { shot } from "./cam.js";

/* Spotify : lecture / pause d'une piste */
function toggleTrack(i) {
  if (i !== S.cur) { S.au?.pause(); S.cur = i; S.play = true; S.au = D.tracks[i].src ? new Audio(D.tracks[i].src) : null; }
  else S.play = !S.play;
  if (S.au) S.play ? S.au.play().catch(() => {}) : S.au.pause();
  show();
}

/* Clavier du téléphone : k = touche, null = effacer */
function key(k) {
  S.numStr = k === null ? S.numStr.slice(0, -1) : (S.numStr + k).slice(0, 16);
  $("#num").textContent = S.numStr;
  $("[data-del]").style.visibility = S.numStr ? "visible" : "hidden";
}

/* Faux lecteur YouTube (quand une vidéo n'a ni id yt ni src) */
function toggleFakeYt() {
  const b = $("#ytBar"); S.ytOn = !S.ytOn; $("#ytIc").innerHTML = S.ytOn ? PAUSE : PLAY;
  const w = getComputedStyle(b).width; b.style.transition = "none"; b.style.width = w;
  if (S.ytOn) { b.offsetWidth; b.style.transition = "width 120s linear"; b.style.width = "100%"; }
}

/* Un seul écouteur de clic pour toute l'interface (délégation) */
export function initActions() {
  document.addEventListener("click", e => {
    const hit = s => e.target.closest(s);
    let b;
    if ((b = hit("[data-open]"))) return b.dataset.open === "safari" ? (location.href = D.safariUrl) : openApp(b.dataset.open, b);
    if ((b = hit("[data-go]"))) return push(b.dataset.go);
    if ((b = hit("[data-track]"))) return toggleTrack(+b.dataset.track);
    if (hit("[data-shot]")) return shot();
    if (hit("[data-yt]")) return toggleFakeYt();
    if (hit("[data-back],#back,#fback")) return goBack();
    if ((b = hit("[data-slide]"))) { const c = $("#photoCarousel"); return c?.scrollBy({ left: c.clientWidth * +b.dataset.slide, behavior: "smooth" }); }
    if ((b = hit("[data-key]"))) return key(b.dataset.key);
    if (hit("[data-del]")) return key(null);
    if (hit("[data-dial]")) return S.numStr && push("tel:" + S.numStr);
    if ((b = hit("[data-tab]"))) return reset(b.dataset.tab);
  });
}
