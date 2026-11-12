import { D } from "../data.js";
import { esc, P } from "../utils.js";

export const notes = () => ({
  t: "Notes", large: 1,
  h: `<h1 class="big">Notes</h1><p class="mx-4 mb-4 rounded-xl bg-[#1c1c1e] px-3 py-2 text-white/40">Rechercher</p><ul class="grp divide-y divide-white/10">${D.notes.map((n, i) => `<li><button data-go="note:${i}" class="row !items-start flex-col !gap-0.5"><b class="font-semibold">${esc(n.title)}</b><span class="sub">${esc(n.date)} · ${esc(n.text.split("\n")[0])}</span></button></li>`).join("")}</ul>${P}`
});

export const note = i => ({
  t: "Note",
  h: `<div class="p-5"><h1 class="text-[28px] font-bold">${esc(D.notes[i].title)}</h1><p class="sub mb-3">${esc(D.notes[i].date)}</p><p class="whitespace-pre-line text-[17px] leading-relaxed">${esc(D.notes[i].text)}</p></div>`
});
