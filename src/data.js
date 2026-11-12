/* ===================== CONTENU =====================
   Tout ce qui s'affiche dans le téléphone se modifie ici.
   Les fichiers (images, sons…) vivent dans public/ et sont référencés SANS le "public/"
   ex. "icons/messages.png" -> public/icons/messages.png */
export const D = {
  owner: "Maabio", ownerPic: "profil/maabio.jpg",
  battery: 9,
  weather: { city: "Abidjan", temp: 29, cond: "Partiellement nuageux", hi: 31, lo: 25,
    hours: [["⛅", 29], ["⛅", 30], ["☀️", 31], ["⛅", 30], ["🌧️", 27], ["🌙", 26]],
    days: [["⛅", 25, 31], ["🌧️", 24, 29], ["🌧️", 24, 28], ["⛅", 25, 30], ["☀️", 25, 32]] },
  wallpaper: "screen/1.webp",
  lockText: "Tu as retrouvé le téléphone de Maabio",
  notif: { app: "messages", title: "Kayla", text: "maman chargeur est ou oh ?", time: "maintenant" },

  /* Galerie : remplie automatiquement depuis public/gallery/ (voir gallery.js) */
  gallery: [],

  chats: [
    { name: "coach hamond chic", pic: "profil/coach.jpg", unread: 1, time: "20:45", msgs: [{ t: "j'aime trop" }] },
    { name: "vanene", pic: "profil/vane.jpg", time: "18:06", msgs: [{ t: "skyjo ?" }] }
  ],
  notes: [
    { title: "Liste de courses", date: "Hier", text: "Pâtes\nCroquettes\nPiles AA\n(Remplace ce texte par tes notes.)" },
    { title: "Idées de textes", date: "Lundi", text: "Une ligne, un souvenir, une rature.\n(Remplace ce texte par tes notes.)" }
  ],
  contacts: ["alric", "daiki", "durd", "einatshi", "icy", "iksma", "kev 117", "moggy", "nachos", "nbrs"].map(name => ({ name })),
  calls: [{ name: "Kayla", type: "FaceTime vidéo", time: "Hier", miss: 1 }, { name: "CHAKA BINATE", type: "FaceTime audio", time: "Lundi" }],
  events: [{ day: 12, t: "Studio", h: "14:00" }, { day: 20, t: "Dîner chez CHAKA BINATE", h: "20:30" }],
  tracks: [
    { title: "Titre 1", artist: "Maabio", a: "#fb7185", b: "#7c3aed", src: "" },
    { title: "Titre 2", artist: "Maabio", a: "#38bdf8", b: "#1e3a8a", src: "" },
    { title: "Titre 3", artist: "Maabio", a: "#facc15", b: "#ea580c", src: "" }
  ],
  videos: [
    { yt: "gI9UbjpCsPw", title: "Vidéo 1", chan: "YouTube", meta: "Recommandé pour toi", a: "#fb7185", b: "#7c3aed" },
    { yt: "4Qb2nPumLDI", title: "Vidéo 2", chan: "YouTube", meta: "Recommandé pour toi", a: "#38bdf8", b: "#1e3a8a" },
    { yt: "nWqa--sCZ1Y", title: "Vidéo 3", chan: "YouTube", meta: "Recommandé pour toi", a: "#facc15", b: "#ea580c" }
  ],
  safariUrl: "https://the42.fr", /* clic sur Safari → redirige ici */
  caller: { name: "marie-kerene", pic: "gallery/25.jpg", number: "+33 6 39 98 20 11", maybe: "Maabio" }, /* appel entrant */
  lowBattery: 6,
  callAudio: ["voice/appel.mp3", "voice appel.mp3"], /* essaie le 1er chemin, puis le 2e si introuvable */
  msg: { done: "Tu as bien écouté mon vocal ? Réponds-moi vite 💜", missed: "Tu n’as pas décroché… Rappelle-moi dès que tu peux 🙏" },
  recents: [],
  wa: [
    { name: "Kayla", time: "09:41", unread: 2, msgs: [{ t: "Tu es où ??", h: "09:12" }, { me: 1, t: "Au studio, j’arrive", h: "09:14" }, { vo: "0:12", t: "🎤 0:12", h: "09:30" }, { img: { a: "#fda4af", b: "#be123c" }, t: "📷 Photo", h: "09:36", dl: "1,2 Mo" }, { t: "maman chargeur est ou oh ?", h: "09:41" }] },
    { name: "CHAKA BINATE", time: "Lundi", msgs: [{ me: 1, t: "T’as vu la vidéo ?", h: "21:30" }, { vo: "0:07", t: "🎤 0:07", h: "21:31" }, { img: { a: "#fcd34d", b: "#f97316" }, t: "📷 Photo", h: "21:32" }, { t: "Morte de rire 😂", h: "21:33" }] }
  ],
  /* Groupe WhatsApp ajouté dès qu’on décroche (nom et messages à personnaliser) */
  waGroup: { name: "Les Bios ♻️", pic: "gallery/1.jpg", sub: "kng, desso, maxime, aurel…", time: "maintenant", unread: 1, top: 1, msgs: [
    { me: 1, one: 1, fwd: 1, file: { n: "Maabio - banalité.wav", s: "1,5 Mo • mp3" }, t: "vous en dites quoi ?" }
  ] }
};
