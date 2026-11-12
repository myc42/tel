import { D } from "./data.js";
import { S } from "./state.js";
import { stamp } from "./utils.js";
import { show, current } from "./nav.js";

/* ===================== GALERIE =====================
   Scanne public/gallery/ : 1.jpg, 2.mp4, 3.png … (numéros croissants, trous tolérés).
   Tu ajoutes un fichier avec le numéro suivant → il apparaît tout seul, rien à modifier ici.
   Ordre d'affichage = numéro du fichier.
   gap = nombre de numéros vides d'affilée avant d'arrêter le scan. */
const GAL = { dir: "gallery", img: ["jpg", "jpeg", "png", "webp"], vid: ["mp4", "mov", "webm"], gap: 15, max: 500, batch: 8 };

const probe = (url, vid) => new Promise(done => {
  setTimeout(() => done(false), 6000);
  if (location.protocol !== "file:")
    return fetch(url, { method: "HEAD" }).then(r => done(r.ok && /^(image|video)\//.test(r.headers.get("content-type") || ""))).catch(() => done(false));
  /* en local (file://) fetch est bloqué : on teste en chargeant le fichier */
  const e = vid ? document.createElement("video") : new Image();
  e.onload = e.onloadedmetadata = () => done(true); e.onerror = () => done(false);
  if (vid) e.preload = "metadata";
  e.src = url;
});

const TYPES = [...GAL.img.map(x => [x, 0]), ...GAL.vid.map(x => [x, 1])];

const findNum = async n => (await Promise.all(TYPES.map(async ([x, vid]) => {
  const src = `${GAL.dir}/${n}.${x}`;
  return (await probe(src, vid)) ? { src, vid } : null;
}))).filter(Boolean);

async function loadGallery() {
  const out = []; let miss = 0;
  for (let n = 1; n <= GAL.max && miss < GAL.gap; n += GAL.batch)
    for (const r of await Promise.all(Array.from({ length: GAL.batch }, (_, k) => findNum(n + k))))
      r.length ? (out.push(...r), miss = 0) : miss++;
  return out;
}

export function initGallery() {
  loadGallery().then(items => {
    D.gallery.push(...items.map((p, i) => ({ ...p, date: stamp(i) })));
    S.galReady = true;
    if (current()?.k === "photos") show();
  });
}
