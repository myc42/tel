import { D } from "../data.js";
import { S } from "../state.js";
import { $, esc, dur, P, EMPTY } from "../utils.js";

const thumb = p => p.vid
  ? `<video src="${esc(p.src)}#t=0.1" preload="metadata" muted playsinline class="absolute inset-0 h-full w-full object-cover"></video><b class="absolute bottom-1 right-1.5 text-[12px] font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,.8)]">▶</b>`
  : `<img src="${esc(p.src)}" loading="lazy" decoding="async" alt="" class="absolute inset-0 h-full w-full object-cover">`;

/* Affiche la durée des vidéos dès que leurs métadonnées sont chargées */
const showDurations = () => document.querySelectorAll("#body video").forEach(v => {
  const set = () => { v.nextElementSibling.textContent = dur(v.duration); };
  v.readyState >= 1 ? set() : v.addEventListener("loadedmetadata", set, { once: true });
});

export const photos = () => {
  const g = D.gallery, nv = g.filter(p => p.vid).length, np = g.length - nv;
  return {
    t: "Photos", large: 1, after: showDurations,
    h: `<h1 class="big">Bibliothèque</h1>${g.length
      ? `<div class="grid grid-cols-3 gap-0.5">${g.map((p, i) => `<button data-go="photo:${i}" class="relative aspect-square overflow-hidden bg-[#1c1c1e]" aria-label="${p.vid ? "Vidéo" : "Photo"} ${i + 1}">${thumb(p)}</button>`).join("")}</div><p class="py-6 text-center text-[15px]">${np} photo${np > 1 ? "s" : ""}, ${nv} vidéo${nv > 1 ? "s" : ""}</p>`
      : EMPTY(S.galReady ? "Aucune photo" : "Chargement…")}${P}`
  };
};

/* Visionneuse : slider horizontal (photos + vidéos), date en haut, boutons reculer / avancer */
export const photo = i => ({
  t: "Photo", full: 1,
  after: () => {
    const c = $("#photoCarousel"); if (!c) return;
    c.scrollLeft = c.clientWidth * +i;
    c.addEventListener("scroll", () => {
      clearTimeout(c._t);
      c._t = setTimeout(() => {
        const k = Math.round(c.scrollLeft / c.clientWidth);
        c.querySelectorAll("video").forEach(v => { if (+v.dataset.i !== k) v.pause(); });
      }, 120);
    }, { passive: true });
  },
  h: `
    <div class="absolute inset-0 bg-black flex flex-col z-[100]">
      <button data-back class="glass absolute left-3 top-[58px] z-[110] flex items-center justify-center rounded-full bg-black/40 pr-0.5 h-9 w-9" aria-label="Retour">
        <svg width="10" height="17" viewBox="0 0 12 20"><path d="M10 2 2 10l8 8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button data-slide="-1" class="glass absolute left-3 top-1/2 -translate-y-1/2 z-[110] flex items-center justify-center rounded-full bg-black/50 h-10 w-10 text-white shadow-lg" aria-label="Reculer">
        <svg width="12" height="20" viewBox="0 0 12 20"><path d="M10 2 2 10l8 8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button data-slide="1" class="glass absolute right-3 top-1/2 -translate-y-1/2 z-[110] flex items-center justify-center rounded-full bg-black/50 h-10 w-10 text-white shadow-lg" aria-label="Avancer">
        <svg width="12" height="20" viewBox="0 0 12 20"><path d="M2 2l8 8-8 8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div id="photoCarousel" class="flex h-full w-full overflow-x-auto overscroll-x-contain snap-x snap-mandatory" style="scrollbar-width: none;">
        ${D.gallery.map((p, k) => `
          <div class="relative flex h-full w-full shrink-0 snap-center snap-always flex-col items-center justify-center">
            <div class="absolute top-[62px] inset-x-0 text-center z-[105]"><span class="text-white text-[14px] font-semibold drop-shadow-md">${esc(p.date || "")}</span></div>
            ${p.vid
              ? `<div class="h-full w-full pb-11 pt-[96px]"><video data-i="${k}" src="${esc(p.src)}#t=0.1" controls playsinline preload="metadata" class="h-full w-full object-contain"></video></div>`
              : `<img src="${esc(p.src)}" loading="lazy" decoding="async" alt="" class="h-full w-full object-contain">`}
          </div>`).join("")}
      </div>
    </div>`
});
