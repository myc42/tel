import "./style.css";
import { D } from "./data.js";
import { initHome } from "./home.js";
import { initActions } from "./actions.js";
import { initLock } from "./lock.js";
import { initGallery } from "./gallery.js";
import { initTikTok } from "./tiktok.js";
import { initScenario } from "./scenario.js";

initHome();
initActions();
initLock();
initGallery();
initTikTok();
initScenario();

/* Titres et chaînes réels des vidéos YouTube (si le réseau le permet) */
D.videos.forEach(v =>
  fetch("https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + v.yt))
    .then(r => r.json()).then(j => { v.title = j.title; v.chan = j.author_name; }).catch(() => {})
);
