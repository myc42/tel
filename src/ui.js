import { esc, ini } from "./utils.js";

/* Avatar : photo si o.pic, sinon pastille avec initiales */
export const pav = (o, z, fs, t) => o.pic
  ? `<img src="${o.pic}" alt="" class="shrink-0 rounded-full object-cover" style="width:${z}px;height:${z}px">`
  : `<span class="av" style="width:${z}px;height:${z}px;font-size:${fs}px${o.grad ? ";background:" + o.grad : ""}">${t ?? o.ini ?? ini(o.name)}</span>`;

/* Barre d'onglets du bas (Téléphone, WhatsApp) */
export const tabs = (items, act, c) => `<div class="glass sticky bottom-0 flex justify-around border-t border-white/10 bg-black/85 pb-9 pt-2 text-[10px]">${items.map(([l, k, i]) => `<button ${k ? `data-tab="${k}"` : ""} class="flex w-16 flex-col items-center gap-0.5" style="color:${l === act ? c : "#8e8e93"}">${i}${esc(l)}</button>`).join("")}</div>`;
export const withTabs = (h, items, act, c) => `<div class="flex min-h-full flex-col"><div class="flex-1">${h}</div>${tabs(items, act, c)}</div>`;
