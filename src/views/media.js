import { D } from "../data.js";
import { S } from "../state.js";
import { esc, ini, bg, gr, P } from "../utils.js";
import { PLAY, PAUSE } from "../icons.js";

export const youtube = () => ({
  t: "YouTube", full: 1,
  h: `<div class="absolute inset-0 overflow-y-auto bg-[#0f0f0f]"><div class="flex items-center justify-between pb-2 pl-14 pr-4 pt-[62px]"><span class="flex items-center gap-1.5 text-[20px] font-bold tracking-tight"><svg width="30" height="21" viewBox="0 0 30 21"><rect width="30" height="21" rx="6" fill="#f00"/><path d="M12 5.5v10l8.5-5z" fill="#fff"/></svg>YouTube</span><span class="av h-8 w-8 text-sm">${ini(D.owner)}</span></div><div class="flex gap-2 overflow-x-auto px-4 pb-3 text-[14px]">${["Tout", "Musique", "En direct", "Chats"].map((c, i) => `<span class="shrink-0 rounded-lg px-3 py-1.5 ${i ? "bg-white/10" : "bg-white text-black"}">${c}</span>`).join("")}</div>${D.videos.map((v, i) => `<button data-go="ytvid:${i}" class="block w-full pb-5 text-left"><span class="relative block aspect-video w-full" style="${v.yt ? bg({ src: `https://i.ytimg.com/vi/${v.yt}/hqdefault.jpg` }) : gr(v)}">${v.dur ? `<b class="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 text-[12px] font-medium">${esc(v.dur)}</b>` : ""}</span><span class="flex gap-3 px-3 pt-3"><span class="av h-9 w-9 text-sm">${ini(v.chan)}</span><span><b class="block text-[15px] font-medium leading-snug">${esc(v.title)}</b><span class="sub">${esc(v.chan)} · ${esc(v.meta)}</span></span></span></button>`).join("")}${P}${P}</div>`
});

export const ytvid = i => {
  const v = D.videos[i]; S.ytOn = false;
  return {
    t: "YouTube", full: 1,
    h: `<div class="absolute inset-0 overflow-y-auto bg-[#0f0f0f]"><div class="relative mt-[54px] aspect-video w-full bg-black" style="${gr(v)}">${v.yt ? `<iframe src="https://www.youtube.com/embed/${v.yt}?autoplay=1&playsinline=1&rel=0" class="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>` : v.src ? `<video src="${esc(v.src)}" controls autoplay playsinline class="absolute inset-0 h-full w-full bg-black"></video>` : `<button data-yt class="absolute inset-0 flex items-center justify-center" aria-label="Lecture / pause"><span id="ytIc" class="flex h-14 w-14 items-center justify-center rounded-full bg-black/60">${PLAY}</span></button><i class="absolute inset-x-0 bottom-0 h-1 bg-white/30"><i id="ytBar" class="block h-full w-[3%] bg-[#f00]"></i></i>`}</div><div class="p-3"><h1 class="text-[18px] font-semibold leading-snug">${esc(v.title)}</h1><p class="sub mt-1">${esc(v.meta)}</p><div class="mt-4 flex items-center gap-3"><span class="av h-10 w-10">${ini(v.chan)}</span><b class="flex-1 font-medium">${esc(v.chan)}</b><span class="rounded-full bg-white px-4 py-2 text-[14px] font-medium text-black">S’abonner</span></div></div></div>`
  };
};

export const spotify = () => ({
  t: "Spotify", full: 1,
  h: `<div class="absolute inset-0 overflow-y-auto bg-[#121212]"><div class="bg-gradient-to-b from-[#1b5e3a] to-transparent px-4 pb-4 pt-[104px]"><h1 class="text-[26px] font-bold">Ta bibliothèque</h1><div class="mt-3 flex gap-2 text-[14px]">${["Playlists", "Artistes", "Albums"].map(c => `<span class="rounded-full bg-white/10 px-3 py-1.5">${c}</span>`).join("")}</div></div><ul>${D.tracks.map((t, i) => `<li><button data-track="${i}" class="row"><span class="h-14 w-14 shrink-0" style="${gr(t)}"></span><span class="flex-1"><b class="block text-[16px] font-medium ${S.cur === i ? "text-[#1ed760]" : ""}">${esc(t.title)}</b><span class="sub">${esc(t.artist)}</span></span></button></li>`).join("")}</ul>${P}${P}${S.cur < 0 ? "" : `<button data-track="${S.cur}" class="sticky bottom-[70px] mx-2 flex w-[calc(100%-16px)] items-center gap-3 rounded-lg bg-[#4a2c5e] p-2 text-left"><span class="h-10 w-10 rounded" style="${gr(D.tracks[S.cur])}"></span><span class="flex-1"><b class="block text-[14px] font-medium">${esc(D.tracks[S.cur].title)}</b><span class="sub">${esc(D.tracks[S.cur].artist)}</span></span><span class="pr-2">${S.play ? PAUSE : PLAY}</span></button>`}<div class="sticky bottom-0 flex justify-around bg-black/90 pb-9 pt-3 text-[11px]"><span class="text-white/50">Accueil</span><span class="text-white/50">Recherche</span><b class="font-medium">Ta bibliothèque</b></div></div>`
});
