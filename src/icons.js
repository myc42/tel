import { now } from "./utils.js";

/* Petits SVG réutilisables */
export const SI = d => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
export const HS = '<path fill="#fff" d="M18 12c-3 1-5 4-4 9 3 12 14 23 27 27 5 1 8-1 9-4l1-3c.4-1-.1-2-1-2.5l-8-3.6c-1-.4-2-.2-2.7.6l-2 2.4c-5-2.4-9.5-7-12-12l2.4-2c.8-.7 1-1.7.6-2.7l-3.6-8C21 12.3 20 12 19 12z"/>';
export const CH = '<svg width="12" height="20" viewBox="0 0 12 20"><path d="M10 2 2 10l8 8" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const CR = '<svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l6 6-6 6"/></svg>';
export const PLAY = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>';
export const PAUSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
export const WV = Array.from({ length: 26 }, (_, k) => `<i class="w-[2.5px] shrink-0 rounded-full" style="height:${5 + (k * 7 % 5) * 4}px;background:rgba(255,255,255,${k < 9 ? .9 : .4})"></i>`).join("");

/* Icônes d'apps (images dans public/icons/) */
const _img = url => `<img src="${url}" class="absolute inset-0 w-full h-full object-cover scale-[1.02]" alt="">`;
const TKP = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

export const IC = {
  messages: ["#fff", _img("icons/messages.png")],
  photos: ["#fff", _img("icons/photos.png")],
  notes: ["#fff", _img("icons/notes.png")],
  contacts: ["#fff", _img("icons/contacts.png")],
  facetime: ["#fff", _img("icons/facetime.png")],
  calendar: ["#fff", `<div class="text-center leading-none mt-1"><div class="text-[11px] font-bold text-[#ff3b30] uppercase tracking-wider">${now.toLocaleDateString("fr-FR", { weekday: "short" })}</div><div class="text-[34px] font-light text-black -mt-0.5">${now.getDate()}</div></div>`],
  camera: ["#fff", _img("icons/camera.png")],
  youtube: ["#fff", _img("icons/youtube.png")],
  spotify: ["#fff", _img("icons/spotify.png")],
  safari: ["#fff", _img("icons/safari.png")],
  phone: ["#fff", _img("icons/phone.png")],
  whatsapp: ["#fff", _img("icons/whatsapp.png")],
  weather: ["#fff", _img("icons/weather.png")],
  /* Si icons/tiktok.png existe elle remplace le logo dessiné ci-dessous */
  tiktok: ["#000", `<svg viewBox="0 0 60 60" class="absolute inset-0 h-full w-full"><g transform="translate(16.2 15.6) scale(1.2)"><path d="${TKP}" fill="#25f4ee" transform="translate(-.8 -.8)"/><path d="${TKP}" fill="#fe2c55" transform="translate(.8 .8)"/><path d="${TKP}" fill="#fff"/></g></svg><img src="icons/tiktok.png" onerror="this.remove()" class="absolute inset-0 h-full w-full scale-[1.02] object-cover" alt="">`]
};

/* [nom affiché, couleur d'accent] */
export const APPS = {
  messages: ["Messages", "#0a84ff"], photos: ["Galerie", "#0a84ff"], notes: ["Notes", "#ffd60a"], contacts: ["Contacts", "#0a84ff"],
  facetime: ["FaceTime", "#30d158"], calendar: ["Calendrier", "#ff453a"], camera: ["Appareil photo", "#ffd60a"], youtube: ["YouTube", "#ff3030"],
  spotify: ["Spotify", "#1ed760"], safari: ["Safari", "#0a84ff"], phone: ["Téléphone", "#0a84ff"], whatsapp: ["WhatsApp", "#25d366"], weather: ["Météo", "#fff"]
};

export const ic = (id, z = 1) => `<span class="ic" style="zoom:${z};background:${IC[id][0]}">${IC[id][1]}</span>`;
export const appBtn = (id, label) => `<button data-open="${id}" class="flex w-[100%] flex-col items-center gap-1 text-[11.5px] font-bold" aria-label="${APPS[id][0]}">${ic(id)}${label ? `<span class="w-full truncate text-center">${APPS[id][0]}</span>` : ""}</button>`;

/* Icône de batterie de la barre d'état */
export const batt = (p, lp) => `<svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="4.5" fill="none" stroke="#fff" opacity=".4"/><rect x="2" y="2" width="${Math.max(2.5, 19 * p / 100)}" height="9" rx="3" fill="${lp ? "#ffd60a" : p <= 20 ? "#ff3b30" : "#fff"}"/><path d="M24 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2z" fill="#fff" opacity=".45"/><text x="11.5" y="9.6" font-size="9" font-weight="700" text-anchor="middle" fill="#fff">${p}</text></svg>`;
