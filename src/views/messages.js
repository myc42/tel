import { D } from "../data.js";
import { esc, P } from "../utils.js";
import { CH, CR, SI } from "../icons.js";
import { pav } from "../ui.js";

const bubble = m => `<div class="flex ${m.me ? "justify-end" : ""}"><p class="max-w-[75%] rounded-[18px] px-3.5 py-2 text-[17px] leading-snug ${m.me ? "bg-[#0a84ff]" : "bg-[#262629]"}">${esc(m.t)}</p></div>`;

export const messages = () => ({
  t: "Messages", nohdr: 1,
  h: `<div class="px-4 pb-1 pt-[58px]"><div class="flex justify-between"><button data-back class="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1e]" aria-label="Retour">${CH}</button><span class="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1e]">${SI('<path d="M4 6h16M7 12h10M10 18h4"/>')}</span></div><h1 class="mt-6 text-[38px] font-extrabold leading-none tracking-tight">Messages</h1></div><ul class="mt-5">${D.chats.map((c, i) => `<li class="relative mx-4 border-b border-white/10">${c.unread ? '<i class="absolute -left-3.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#3b82f6]"></i>' : ""}<button data-go="chat:${i}" class="flex w-full items-center gap-3 py-3.5 text-left">${pav(c, 58, 22)}<span class="min-w-0 flex-1"><span class="flex justify-between gap-2"><b class="text-[19px] font-bold">${esc(c.name)}</b><span class="shrink-0 text-[15px] text-white/50">${esc(c.time)}</span></span><span class="block truncate text-[16px] text-white/55">${esc(c.msgs.at(-1).t)}</span></span><span class="text-white/30">${CR}</span></button></li>`).join("")}</ul>${P}`
});

export const chat = i => {
  const c = D.chats[i]; c.unread = 0;
  return { t: c.name, h: `<div class="flex min-h-full flex-col"><div class="flex-1 space-y-1.5 p-3">${c.msgs.map(bubble).join("")}</div><div class="glass sticky bottom-0 bg-black/80 px-3 pb-9 pt-2"><div class="rounded-full border border-white/20 px-4 py-1.5 text-white/40">iMessage</div></div></div>` };
};
