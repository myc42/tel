import { D } from "../data.js";
import { esc, bg } from "../utils.js";
import { SI, PLAY, WV } from "../icons.js";
import { pav, withTabs } from "../ui.js";

const WT = [
  ["Statuts", "", SI('<circle cx="12" cy="12" r="9" stroke-dasharray="3 3"/>')],
  ["Appels", "", SI('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>')],
  ["Communautés", "", SI('<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.5c3 0 6 2 6 5.5"/>')],
  ["Discussions", "", SI('<path d="M4 5h16v11H9l-5 4z"/>')],
  ["Réglages", "", SI('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>')]
];
const GREEN = "#25d366";

const wprev = c => { const m = c.msgs.at(-1); return (m.from ? m.from + " : " : "") + (m.t ?? m.sys ?? ""); };
const wc = n => ["#06cf9c", "#53bdeb", "#ffa726", "#e57373", "#ba68c8"][[...n].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 5];

/* Une bulle de message (texte, vocal, photo, fichier, message système) */
const wm = (m, i, j) => {
  if (m.sys) return `<div class="flex justify-center py-1"><span class="rounded-lg bg-[#182229] px-3 py-1 text-center text-[12.5px] text-[#8696a0]">${esc(m.sys)}</span></div>`;
  const me = m.me, tm = `<span class="text-[11px] text-white/50">${esc(m.h || "")}${me ? (m.one ? " ✓" : ' <span class="text-[#53bdeb]">✓✓</span>') : ""}</span>`;
  const inner = m.vo
    ? `<span class="flex w-[225px] items-center gap-2.5 py-0.5"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">${PLAY}</span><span class="flex h-7 flex-1 items-center gap-[2px]">${WV}</span></span><span class="flex justify-between text-[11px] text-white/60"><span>${m.vo}</span>${tm}</span>`
    : m.img
    ? `<button data-go="wimg:${i}_${j}" class="relative block w-[216px] overflow-hidden rounded-md" aria-label="Voir la photo"><span class="block aspect-[3/4] w-full" style="${bg(m.img)}"></span>${m.dl ? `<span class="absolute inset-0 flex items-center justify-center bg-black/35 text-[13px] font-medium"><span class="rounded-full bg-black/55 px-3 py-1.5">↓ ${m.dl}</span></span>` : ""}<span class="absolute bottom-1 right-1.5 rounded bg-black/40 px-1">${tm}</span></button>`
    : m.file
    ? `<span class="flex items-center gap-3 rounded-2xl bg-black/25 px-2.5 py-2.5"><svg class="shrink-0" width="28" height="33" viewBox="0 0 34 40"><path d="M3 0h19l11 11v26a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" fill="#8e9195"/><path d="M22 0l11 11h-8a3 3 0 0 1-3-3z" fill="#b8bbbe"/><text x="17" y="31" font-size="9" font-weight="700" text-anchor="middle" fill="#fff">MP3</text></svg><span class="min-w-0"><span class="block text-[15px] leading-tight">${esc(m.file.n)}</span><span class="text-[12px] text-white/50">${esc(m.file.s)}</span></span></span><span class="flex items-end justify-between gap-3 px-1.5 pt-2"><span class="text-[15px]">${esc(m.t)}</span>${tm}</span>`
    : `${m.from ? `<b class="block text-[13px] font-semibold" style="color:${wc(m.from)}">${esc(m.from)}</b>` : ""}${esc(m.t)} <span class="float-right ml-2 mt-2">${tm}</span>`;
  const fw = m.fwd ? '<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/25"><svg width="17" height="17" viewBox="0 0 24 24" fill="#fff"><path d="M13 5l8 7-8 7v-4.5c-5 0-8 1.2-10 5 .6-6.500 4.500-10 10-10z"/></svg></span>' : "";
  return `<div class="flex ${me ? "items-center justify-end gap-3" : ""}">${fw}<div class="max-w-[80%] rounded-[20px] px-3 py-1.5 text-[15px] leading-snug ${m.img ? "!p-1 " : m.file ? "!p-1.5 " : ""}${me ? "bg-[#144d37]" : "bg-[#1f1f1f]"}">${inner}</div></div>`;
};

export const whatsapp = () => ({
  t: "WhatsApp", large: 1,
  h: withTabs(`<h1 class="big">Discussions</h1><p class="mx-4 mb-2 rounded-xl bg-[#1c1c1e] px-3 py-2 text-white/40">Rechercher</p><div class="flex gap-2 overflow-x-auto px-4 pb-3 text-[14px]">${["Toutes", "Non lues", "Favoris", "Groupes"].map((x, k) => `<span class="shrink-0 rounded-full px-3 py-1 ${k ? "bg-white/10 text-white/70" : "bg-[#103529] text-[#25d366]"}">${x}</span>`).join("")}</div><ul>${D.wa.map((c, i) => [c, i]).sort((x, y) => (y[0].top | 0) - (x[0].top | 0)).map(([c, i]) => `<li><button data-go="wchat:${i}" class="row items-start">${pav(c, 52, 18)}<span class="min-w-0 flex-1 border-b border-white/10 pb-2.5"><span class="flex justify-between"><b class="font-semibold">${esc(c.name)}</b><span class="text-[13px] ${c.unread ? "text-[#25d366]" : "text-white/50"}">${esc(c.time)}</span></span><span class="flex items-center justify-between gap-2"><span class="line-clamp-1 text-[15px] text-white/50">${esc(wprev(c))}</span>${c.unread ? `<i class="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#25d366] px-1 text-[12px] font-semibold not-italic text-black">${c.unread}</i>` : ""}</span></span></button></li>`).join("")}</ul>`, WT, "Discussions", GREEN)
});

export const wchat = i => {
  const c = D.wa[i]; c.unread = 0;
  return {
    t: c.name, full: 1, nofb: 1,
    h: `<div class="absolute inset-0 flex flex-col bg-[#0b0b0b]"><div class="glass flex shrink-0 items-center gap-2.5 bg-black/70 px-3 pb-2 pt-[56px] !rounded-none !border-none"><button data-back class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1e]" aria-label="Retour"><svg width="12" height="20" viewBox="0 0 12 20"><path d="M10 2 2 10l8 8" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>${pav(c, 38, 14)}<span class="min-w-0 flex-1"><b class="block truncate text-[16px] font-semibold leading-tight">${esc(c.name)}</b><span class="block truncate text-[12px] text-white/55">${esc(c.sub ?? "en ligne")}</span></span><span class="flex h-11 shrink-0 items-center gap-4 rounded-full border border-white/10 bg-[#1c1c1e] px-4">${SI('<rect x="2" y="6" width="13" height="12" rx="3"/><path d="M16.5 10.5L22 7.5v9l-5.5-3z"/>')}${SI('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>')}</span></div><div class="wapp flex-1 overflow-y-auto px-3 pb-3 pt-4"><p class="mx-auto mb-3 w-fit rounded-full bg-[#1c1c1e] px-3 py-0.5 text-[13px] font-semibold">Aujourd’hui</p><p class="mx-auto mb-4 max-w-[88%] rounded-xl bg-[#1d1d1b] px-3 py-2 text-center text-[12.5px] leading-snug text-[#f3c969]">🔒 Les messages et les appels sont chiffrés de bout en bout. Seules les personnes prenant part à cette discussion peuvent les lire, les écouter ou les partager. <b>En savoir plus</b></p><div class="space-y-1.5">${c.msgs.map((m, j) => wm(m, i, j)).join("")}</div></div><div class="flex shrink-0 items-center gap-3 bg-black/70 px-3 pb-8 pt-2"><span class="text-[34px] font-light leading-none">+</span><div class="flex flex-1 items-center justify-between rounded-full bg-[#1c1c1e] px-4 py-2.5 text-white/50"><span></span>${SI('<path d="M5 4h10l4 4v8a4 4 0 0 1-4 4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M14 4v4h5"/>')}</div>${SI('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>')}<span class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">${SI('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>')}</span></div></div>`
  };
};

export const wimg = a => {
  const [i, j] = a.split("_"), m = D.wa[i].msgs[j];
  return { t: "Photo", full: 1, h: `<div class="absolute inset-0 flex items-center bg-black"><div class="aspect-[3/4] w-full" style="${bg(m.img)}"></div></div>` };
};
