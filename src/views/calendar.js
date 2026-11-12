import { D } from "../data.js";
import { esc, now, P } from "../utils.js";

const mon = now.toLocaleDateString("fr-FR", { month: "short" });

export const calendar = () => {
  const y = now.getFullYear(), m = now.getMonth(), off = (new Date(y, m, 1).getDay() + 6) % 7, dn = new Date(y, m + 1, 0).getDate(), has = d => D.events.some(e => e.day === d);
  let c = "<span></span>".repeat(off);
  for (let d = 1; d <= dn; d++) {
    const t = d === now.getDate();
    c += `<span class="mx-auto flex h-10 w-10 flex-col items-center justify-center rounded-full text-[20px] ${t ? "bg-[#ff453a] font-semibold" : ""}">${d}${has(d) ? `<i class="-mt-0.5 h-1 w-1 rounded-full ${t ? "bg-white" : "bg-white/50"}"></i>` : ""}</span>`;
  }
  return {
    t: "Calendrier", large: 1,
    h: `<h1 class="big capitalize" style="color:var(--ac)">${now.toLocaleDateString("fr-FR", { month: "long" })} <span class="text-white/40">${y}</span></h1><div class="grid grid-cols-7 gap-y-1 px-3 pb-4 text-center">${[..."LMMJVSD"].map(x => `<span class="sub font-semibold">${x}</span>`).join("")}${c}</div><ul class="grp divide-y divide-white/10">${D.events.map(e => `<li class="row"><i class="h-9 w-1 rounded-full bg-[#ff453a]"></i><span><b class="block font-semibold">${esc(e.t)}</b><span class="sub">${e.day} ${mon} · ${esc(e.h)}</span></span></li>`).join("")}</ul>${P}`
  };
};
