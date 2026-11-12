import { D } from "../data.js";
import { esc, ini, P } from "../utils.js";
import { CR } from "../icons.js";
import { pav } from "../ui.js";

export const contacts = () => {
  const s = [...D.contacts].sort((a, b) => a.name.localeCompare(b.name));
  return {
    t: "Contacts", nohdr: 1,
    h: `<div class="flex items-center justify-between px-5 pb-5 pt-[64px]"><button data-back class="w-8 text-left" aria-label="Retour"><svg width="11" height="18" viewBox="0 0 11 18" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2L2 9l7 7"/></svg></button><b class="text-[19px] font-semibold">Contacts</b><span class="w-8 text-right text-[34px] font-light leading-none">+</span></div><div class="mx-4 mb-1 flex items-center gap-4 border-b border-white/10 pb-4">${pav({ name: D.owner, pic: D.ownerPic }, 68, 26)}<span><b class="block text-[26px] font-bold leading-tight">${esc(D.owner)}</b><span class="text-[17px] text-white/45">Ma fiche</span></span></div><ul>${s.map(c => `<li class="mx-4 border-b border-white/10"><button data-go="contact:${D.contacts.indexOf(c)}" class="flex w-full items-center gap-4 py-2.5 text-left">${pav(c, 50, 22, esc(c.name[0].toUpperCase()))}<span class="flex-1 text-[21px]">${esc(c.name)}</span><span class="text-white/30">${CR}</span></button></li>`).join("")}</ul>${P}`
  };
};

export const contact = i => {
  const c = D.contacts[i], ci = D.chats.findIndex(x => x.name === c.name);
  const b = (l, g) => `<button data-go="${g}" class="flex-1 rounded-xl bg-[#1c1c1e] py-2.5 text-[12px]" style="color:var(--ac)">${l}</button>`;
  return {
    t: "Contact",
    h: `<div class="flex flex-col items-center px-4 pt-6"><span class="av h-[100px] w-[100px] text-4xl">${ini(c.name)}</span><h1 class="mt-3 text-[28px] font-bold">${esc(c.name)}</h1><div class="mt-5 flex w-full gap-2">${ci >= 0 ? b("message", "chat:" + ci) : ""}${b("appeler", "tel:" + esc(c.name))}${b("vidéo", "call:" + esc(c.name))}</div><ul class="grp !mx-0 mt-5 w-full divide-y divide-white/10 text-left">${["Envoyer un message", "Partager le contact", "Ajouter aux favoris"].map(l => `<li class="row" style="color:var(--ac)">${l}</li>`).join("")}</ul></div>`
  };
};
