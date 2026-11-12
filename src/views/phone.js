import { S } from "../state.js";
import { HS, SI } from "../icons.js";
import { EMPTY } from "../utils.js";
import { tabs, withTabs } from "../ui.js";
import { contacts } from "./contacts.js";
import { call } from "./facetime.js";

/* [libellé, vue, icône] */
const PT = [
  ["Favoris", "favs", SI('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>')],
  ["Récents", "recents", SI('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')],
  ["Contacts", "pcontacts", SI('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7"/>')],
  ["Clavier", "phone", SI('<path stroke-width="3.2" d="M6 6h.01M12 6h.01M18 6h.01M6 12h.01M12 12h.01M18 12h.01M6 18h.01M12 18h.01M18 18h.01"/>')],
  ["Messagerie", "vm", SI('<circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/><path d="M7 16h10"/>')]
];
const BLUE = "#0a84ff";

export const phone = () => {
  S.numStr = "";
  return {
    t: "Clavier", full: 1,
    h: `<div class="absolute inset-0 flex flex-col bg-black"><div class="flex flex-1 items-end justify-center pb-5"><p id="num" class="h-11 text-[34px] font-light"></p></div><div class="mx-auto grid w-fit grid-cols-3 gap-x-5 gap-y-3.5">${[["1", ""], ["2", "ABC"], ["3", "DEF"], ["4", "GHI"], ["5", "JKL"], ["6", "MNO"], ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"], ["*", ""], ["0", "+"], ["#", ""]].map(([k, l]) => `<button data-key="${k}" class="flex h-[78px] w-[78px] flex-col items-center justify-center rounded-full bg-[#333336] active:bg-[#5a5a5e]"><span class="text-[34px] leading-none">${k}</span><span class="h-3 text-[10px] font-semibold tracking-[2px]">${l}</span></button>`).join("")}</div><div class="mx-auto my-3.5 grid w-fit grid-cols-3 gap-x-5"><span></span><button data-dial class="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-[#30d158]" aria-label="Appeler"><svg width="36" height="36" viewBox="0 0 60 60">${HS}</svg></button><button data-del style="visibility:hidden" class="flex items-center justify-center" aria-label="Effacer"><svg width="30" height="22" viewBox="0 0 30 22" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M10 1h18v20H10L1 11zM15 7l8 8M23 7l-8 8"/></svg></button></div>${tabs(PT, "Clavier", BLUE)}</div>`
  };
};

export const recents = () => ({
  t: "Récents", large: 1,
  h: withTabs(`<div class="flex items-center justify-between px-4 pt-1 text-[17px] text-[#0a84ff]"><span>Modifier</span><span class="flex rounded-lg bg-[#1c1c1e] p-0.5 text-[13px] font-semibold text-white"><span class="rounded-md bg-[#636366] px-4 py-1">Tous</span><span class="px-4 py-1 text-white/70">Manqués</span></span><span class="w-[58px]"></span></div><h1 class="big">Récents</h1>${EMPTY("Aucun appel récent")}`, PT, "Récents", BLUE)
});

export const favs = () => ({
  t: "Favoris", large: 1,
  h: withTabs(`<div class="flex items-center justify-between px-4 pt-1 text-[17px] text-[#0a84ff]"><span>Modifier</span><span class="text-[32px] font-light leading-none">+</span></div><h1 class="big">Favoris</h1>${EMPTY("Aucun favori")}`, PT, "Favoris", BLUE)
});

export const vm = () => ({
  t: "Messagerie", large: 1,
  h: withTabs(`<div class="flex items-center justify-between px-4 pt-1 text-[17px] text-[#0a84ff]"><span></span><span>Répondeur</span></div><h1 class="big">Messagerie</h1>${EMPTY("Aucun message")}`, PT, "Messagerie", BLUE)
});

export const pcontacts = () => { const v = contacts(); v.h = withTabs(v.h, PT, "Contacts", BLUE); return v; };

export const tel = n => { const v = call(n); v.h = v.h.replace("FaceTime…", "appel…"); return v; };
