import { D } from "../data.js";
import { esc, now } from "../utils.js";

const card = (t, b) => `<div class="glass mx-4 mb-3 rounded-[22px] bg-white/15 p-3.5 text-left"><p class="mb-2 border-b border-white/20 pb-2 text-[13px] font-medium text-white/60">${t}</p><b class="block">${b}</b></div>`;

export const weather = () => {
  const W = D.weather, lo = Math.min(...W.days.map(d => d[1])), hi = Math.max(...W.days.map(d => d[2])), h0 = now.getHours();
  return {
    t: "Météo", full: 1,
    h: `<div class="absolute inset-0 overflow-y-auto bg-gradient-to-b from-[#2c5a94] via-[#4a86c5] to-[#1f4272] pb-12 text-center"><div class="pt-[70px]"><h1 class="text-[34px]">${esc(W.city)}</h1><p class="text-[96px] font-extralight leading-none">${W.temp}°</p><p class="text-[20px] text-white/85">${esc(W.cond)}</p><p class="mb-5 text-[20px] text-white/85">Max. ${W.hi}° Min. ${W.lo}°</p></div>${card("Prévisions horaires", `<div class="flex gap-5 overflow-x-auto">${W.hours.map(([ic, t], i) => `<span class="flex shrink-0 flex-col items-center gap-1.5 text-[15px] font-medium"><span>${i ? (h0 + i) % 24 + "h" : "Mainten."}</span><span class="text-[22px]">${ic}</span><span>${t}°</span></span>`).join("")}</div>`)}${card("Prévisions sur 5 jours", W.days.map(([ic, l, h], i) => `<div class="flex items-center gap-3 py-1.5 ${i ? "border-t border-white/10" : ""}"><span class="w-20 text-[17px] font-medium capitalize">${i ? new Date(now.getTime() + i * 864e5).toLocaleDateString("fr-FR", { weekday: "long" }) : "Auj."}</span><span class="w-7 text-[20px]">${ic}</span><span class="w-8 text-right text-white/60">${l}°</span><span class="relative h-1 flex-1 rounded-full bg-black/25"><i class="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#7dd3fc] to-[#fde047]" style="left:${(l - lo) / (hi - lo) * 100}%;width:${(h - l) / (hi - lo) * 100}%"></i></span><span class="w-8 text-right">${h}°</span></div>`).join(""))}</div>`
  };
};
