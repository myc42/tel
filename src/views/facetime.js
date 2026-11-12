import { D } from "../data.js";
import { esc, ini, P } from "../utils.js";
import { IC } from "../icons.js";

export const facetime = () => ({
  t: "FaceTime", large: 1,
  h: `<h1 class="big">FaceTime</h1><div class="mx-4 mb-5 grid grid-cols-2 gap-2 text-center font-medium" style="color:var(--ac)"><span class="rounded-xl bg-[#1c1c1e] py-3">Créer un lien</span><span class="rounded-xl bg-[#1c1c1e] py-3">Nouveau FaceTime</span></div><p class="sub px-4 pb-1.5 font-semibold">Récents</p><ul class="grp divide-y divide-white/10">${D.calls.map(c => `<li><button data-go="call:${esc(c.name)}" class="row"><span class="min-w-0 flex-1"><b class="block text-[17px] font-semibold ${c.miss ? "text-[#ff453a]" : ""}">${esc(c.name)}</b><span class="sub">${esc(c.type)}</span></span><span class="sub">${esc(c.time)}</span></button></li>`).join("")}</ul>${P}`
});

/* Écran d'appel sortant (FaceTime ou appel classique : voir phone.js > tel) */
export const call = n => ({
  t: "FaceTime", full: 1,
  h: `<div class="absolute inset-0 flex flex-col items-center bg-gradient-to-b from-[#3a3a44] to-black px-6 pt-32 text-center"><span class="av relative h-28 w-28 overflow-hidden text-4xl">${/^[\d+*#]/.test(n) ? IC.contacts[1] : ini(n)}</span><h1 class="mt-5 text-[32px] font-semibold">${esc(n)}</h1><p class="mt-1 text-white/60">FaceTime…</p><button data-back class="mb-20 mt-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ff3b30] text-2xl" aria-label="Raccrocher">✕</button></div>`
});
