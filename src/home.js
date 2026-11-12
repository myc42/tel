import { D } from "./data.js";
import { $, esc, now, hm } from "./utils.js";
import { IC, ic, appBtn, batt } from "./icons.js";

const tick = () => {
  const n = new Date();
  $("#clock").textContent = $("#lTime").textContent = hm(n);
  $("#lDate").textContent = n.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
};

/* Barre d'état, fond d'écran, grille d'apps, dock, notification de l'écran verrouillé */
export function initHome() {
  tick(); setInterval(tick, 1000);
  $("#bat").innerHTML = batt(D.battery);

  if (D.wallpaper) {
    const im = new Image();
    im.onload = () => $("#wall").style.backgroundImage = `url('${D.wallpaper}')`;
    im.src = D.wallpaper;
  }

  const ev = D.events.find(e => e.day >= now.getDate());

  $("#grid").innerHTML = `<button data-open="calendar" class="col-span-2 row-span-2 h-[158px] self-start rounded-[22px] bg-[#1c1c1e] p-3.5 text-left" aria-label="Calendrier">
  <span class="block text-[13px] font-semibold uppercase text-[#ff453a]">${now.toLocaleDateString("fr-FR", { weekday: "long" })}</span>
  <span class="block text-[44px] font-light leading-none">${now.getDate()}</span>
  <span class="mt-3 block border-l-[3px] border-[#ff453a] pl-2 text-[13px] ${ev ? "" : "text-white/50"}">${ev ? `<b class="block font-semibold">${esc(ev.t)}</b>${ev.h}` : "Aucun évènement"}</span></button>`
    + ["photos", "camera", "youtube", "notes", "contacts", "safari", "facetime", "spotify", "weather"].map(id => appBtn(id, 1)).join("")
    /* TikTok : icône grisée + rond de progression, comme une app en cours d'installation depuis l'App Store */
    + `<button id="tk" class="flex w-[100%] flex-col items-center gap-1 text-[11.5px] font-bold" aria-label="TikTok, téléchargement en cours"><span class="ic" style="background:${IC.tiktok[0]}">${IC.tiktok[1]}<span class="absolute inset-0" style="background:rgba(142,142,147,.55)"></span><span class="absolute inset-0 flex items-center justify-center"><svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="rgba(0,0,0,.22)" stroke="#fff" stroke-width="1.8"/><g id="tkSp" style="transform-box:fill-box;transform-origin:center;animation:spin 1s linear infinite"><circle cx="18" cy="18" r="11" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="14 56"/></g><circle id="tkPie" cx="18" cy="18" r="5.5" fill="none" stroke="#fff" stroke-width="11" stroke-dasharray="0 34.56" transform="rotate(-90 18 18)" opacity="0" style="transition:stroke-dasharray .35s linear"/><g id="tkPz" opacity="0"><rect x="13.5" y="12" width="3" height="12" rx="1" fill="#fff"/><rect x="19.5" y="12" width="3" height="12" rx="1" fill="#fff"/></g></svg></span></span><span class="w-full truncate text-center">TikTok</span></button>`;

  $("#dock").innerHTML = ["whatsapp", "phone", "messages"].map(id => appBtn(id, 0)).join("");

  $("#lMsg").textContent = D.lockText;
  const N = D.notif;
  $("#notif").innerHTML = `${ic(N.app, .63)}<span class="min-w-0 flex-1"><span class="flex justify-between"><b class="text-[15px] font-semibold">${esc(N.title)}</b><span class="text-[13px] text-white/60">${esc(N.time)}</span></span><span class="block text-[15px] leading-snug">${esc(N.text)}</span></span>`;
}
