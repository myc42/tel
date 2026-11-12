import { $ } from "./utils.js";

/* TikTok : « Attente… » puis le rond se remplit de plus en plus lentement, sans jamais atteindre 100 % */
const TKC = 2 * Math.PI * 5.5;
let p = 0, loading = false, paused = false, started = false;

const draw = () => {
  const pie = $("#tkPie"); if (!pie) return;
  $("#tkSp").style.opacity = !loading && !paused ? 1 : 0;
  pie.style.opacity = loading && !paused ? 1 : 0;
  $("#tkPz").style.opacity = paused ? 1 : 0;
  pie.setAttribute("stroke-dasharray", `${(TKC * p).toFixed(2)} ${TKC.toFixed(2)}`);
};

const start = () => {
  if (started) return; started = true; draw();
  setTimeout(() => { loading = true; draw(); }, 3000);
  setInterval(() => { if (!loading || paused) return; p += (.97 - p) * (.003 + Math.random() * .004); draw(); }, 300);
};

export function initTikTok() {
  $("#tk").addEventListener("click", () => { paused = !paused; draw(); navigator.vibrate?.(10); });
  document.addEventListener("ph", ({ detail }) => { if (detail.n === "unlock") start(); });
}
