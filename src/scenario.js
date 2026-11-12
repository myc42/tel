import { D } from "./data.js";
import { S } from "./state.js";
import { $, esc, hm } from "./utils.js";
import { HS, ic, batt } from "./icons.js";
import { show, push, openApp, current } from "./nav.js";
import { unlock } from "./lock.js";
import { tone, ringOnce } from "./sound.js";

/* ===================== SCÉNARIO =====================
   30 s après le déverrouillage : appel entrant → on décroche → vocal →
   message « Tu as bien écouté mon vocal ? » → alerte batterie faible. */

const ph = $("#phone"), C = D.caller, el = $("#call"), cBody = $("#cBody"), bt = $("#batt"), bn = $("#banner");
const setS = v => ph.dataset.s = v;

/* --- vues de l'écran d'appel --- */
const F = (w, d) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="#fff">${d}</svg>`;
const cbtn = (c, label, icon, bgc = "") => `<button data-c="${c}" class="flex flex-col items-center gap-2 text-[14px]">${bgc ? `<span class="flex h-[76px] w-[76px] items-center justify-center rounded-full ${bgc}">${icon}</span>` : icon}${label}</button>`;
const iClock = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/></svg>`;
const iMsg = F(26, '<path d="M12 3C6.5 3 2 6.6 2 11c0 2.3 1.2 4.4 3.2 5.8-.2 1.3-.9 2.6-1.9 3.6 0 0 3.1-.2 5.1-1.8.9.3 1.7.4 2.6.4 5.5 0 10-3.6 10-8S17.5 3 12 3z"/>');
const iSpk = F(34, '<path d="M3 9v6h4l5 4V5L7 9z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>');
const iFt = F(34, '<rect x="2" y="6" width="13" height="12" rx="3"/><path d="M16.5 10.5 22 7.5v9l-5.5-3z"/>');
const iMic = F(34, '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>');

/* Appel entrant : numéro, « peut-être : … », Me rappeler / Message, Accepter (pas de Refuser) */
const ringView = () => `<h1 class="whitespace-nowrap text-[32px] font-medium leading-tight">${esc(C.number)}</h1><p class="text-[18px] text-white/80">peut-être : ${esc(C.maybe)}</p>
    <div class="mt-auto flex w-full justify-between px-4">${cbtn("rem", "Me rappeler", iClock)}${cbtn("msg", "Message", iMsg)}</div>
    <div class="mb-[48px] mt-8">${cbtn("acc", "Accepter", `<svg width="36" height="36" viewBox="0 0 60 60">${HS}</svg>`, "bg-[#65c466]")}</div>`;

/* Appel décroché : numéro, chrono, haut-parleur / FaceTime / silence — aucun bouton pour raccrocher */
const talkView = () => `<h1 class="whitespace-nowrap text-[32px] font-medium leading-tight">${esc(C.number)}</h1><p id="cT" class="text-[18px] text-white/80">00:00</p>
    <div class="mb-[48px] mt-auto grid w-full grid-cols-3 px-[6px]">${cbtn("spk", "haut-parleur", iSpk, "bg-white/15")}${cbtn("ft", "FaceTime", iFt, "bg-white/15")}${cbtn("mute", "silence", iMic, "bg-white/15")}</div>`;

/* --- appel --- */
let st8 = "idle", aud, ti, rg, t0, done = false, mTxt = "";

const freeze = on => ["#home", "#app", "#lock", "#bar", "#banner"].forEach(q => $(q).inert = on);

const upd = () => {
  const t = $("#cT"); if (!t) return;
  const sec = Math.floor((Date.now() - t0) / 1000);
  t.textContent = `${String(sec / 60 | 0).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
};

/* Le groupe WhatsApp apparaît dès qu'on décroche */
function addGroup() {
  const g = D.waGroup; if (!g || D.wa.includes(g)) return;
  g.msgs = g.msgs.map(m => ({ h: hm(new Date()), ...m }));
  D.wa.push(g);
  if (current()?.k === "whatsapp") show();
}

function ring() {
  if (st8 !== "idle" || done) return; done = true; st8 = "ring";
  if (S.au) { S.au.pause(); S.play = false; }
  document.querySelectorAll("#body iframe").forEach(f => f.src = "about:blank");
  document.querySelectorAll("#body video:not(#cam)").forEach(v => v.pause());
  ph.dataset.call = 1; $("#cBg").style.backgroundImage = `url('${D.wallpaper}')`;
  cBody.innerHTML = ringView(); el.classList.remove("off");
  ringOnce(); rg = setInterval(ringOnce, 3000); /* sonne sans fin jusqu'à ce qu'on décroche */
}

function accept() {
  if (st8 !== "ring") return;
  clearInterval(rg); st8 = "talk"; addGroup();
  cBody.innerHTML = talkView(); cBody.querySelectorAll("button").forEach(b => b.disabled = true);
  el.style.pointerEvents = "none"; freeze(true);
  t0 = Date.now(); ti = setInterval(upd, 500); upd(); tone(880, 0, .08);

  const srcs = [].concat(D.callAudio);
  aud = new Audio(); aud.volume = 1;
  const fallback = () => setTimeout(() => st8 === "talk" && end(), 9000);
  const go = i => {
    if (i >= srcs.length) return fallback();
    let handled = false; const bad = () => { if (handled) return; handled = true; go(i + 1); };
    aud.onerror = bad; aud.src = srcs[i]; aud.play().catch(bad);
  };
  aud.onended = () => end(); go(0);
}

function end() {
  if (st8 === "idle") return;
  clearInterval(rg); clearInterval(ti);
  if (aud) { aud.onended = aud.onerror = null; aud.pause(); aud = null; }
  const talked = st8 === "talk"; st8 = "idle"; tone(480, 0, .15);
  if (talked && $("#cT")) $("#cT").textContent = "Appel terminé";
  freeze(false);
  setTimeout(() => { el.classList.add("off"); el.style.pointerEvents = ""; delete ph.dataset.call; }, talked ? 900 : 0);
  const wait = talked ? 3500 : 3000;
  setTimeout(() => notify(D.msg[talked ? "done" : "missed"]), wait);
  setTimeout(lowBattery, wait + 12000);
}

/* --- batterie --- */
const setBat = (p, lp) => { D.battery = p; $("#bat").innerHTML = batt(p, lp); };

function lowBattery() {
  if (st8 !== "idle") return void setTimeout(lowBattery, 3000);
  const p = D.lowBattery; setBat(p);
  $("#bS").textContent = `Il reste ${p} % de batterie.`; bt.classList.remove("off");
  [440, 330].forEach((f, i) => tone(f, i * .2, .3)); navigator.vibrate?.([200, 100, 200]);
}

/* --- bannière de notification (message de rappel) --- */
let nt, delivered = false, y0, moved;

const deliver = () => {
  if (delivered) return; delivered = true;
  D.chats.unshift({ name: C.name, pic: C.pic, unread: 1, time: hm(new Date()), msgs: [{ t: mTxt }] });
};

function notify(text) {
  mTxt = text; moved = false;
  bn.innerHTML = `${ic("messages", .63)}<span class="min-w-0 flex-1"><span class="flex justify-between"><b class="text-[15px] font-semibold">${esc(C.name)}</b><span class="text-[13px] text-white/60">maintenant</span></span><span class="block text-[15px] leading-snug">${esc(text)}</span></span>`;
  bn.classList.add("show"); [987, 1318].forEach((f, i) => tone(f, i * .14, .35)); navigator.vibrate?.(80);
  clearTimeout(nt); nt = setTimeout(dismiss, 6500);
}

function dismiss() { clearTimeout(nt); bn.classList.remove("show"); deliver(); }

/* --- branchements --- */
export function initScenario() {
  el.addEventListener("click", e => { if (e.target.closest('[data-c="acc"]')) accept(); });

  bt.addEventListener("click", e => {
    const b = e.target.closest("[data-b]"); if (!b) return;
    if (b.dataset.b === "lp") setBat(D.battery, true);
    bt.classList.add("off");
  });

  bn.addEventListener("pointerdown", e => { y0 = e.clientY; moved = false; });
  bn.addEventListener("pointerup", e => { if (y0 - e.clientY > 14) { moved = true; dismiss(); } });
  bn.addEventListener("click", () => {
    if (moved) return;
    clearTimeout(nt); bn.classList.remove("show"); deliver();
    if (S.locked) unlock();
    openApp("messages", document.querySelector('#dock [data-open="messages"]')); push("chat:0");
  });

  let started = false;
  document.addEventListener("ph", ({ detail: { n } }) => {
    if (n === "unlock") {
      setS("home");
      [...$("#grid").children, ...$("#dock").children].forEach((e, i) => e.style.setProperty("--i", i));
      ph.classList.add("enter"); setTimeout(() => ph.classList.remove("enter"), 1400);
      if (!started) {
        started = true;
        setTimeout(ring, 30000);
        setTimeout(() => setBat(D.battery - 1), 12000);
        setTimeout(() => setBat(D.battery - 1), 24000);
      }
    } else if (n === "open") setS("app");
    else if (n === "close") setS(S.locked ? "lock" : "home");
  });
}
