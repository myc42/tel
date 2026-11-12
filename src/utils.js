export const $ = s => document.querySelector(s);
export const emit = (n, d) => document.dispatchEvent(new CustomEvent("ph", { detail: { n, d } }));

export const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const ini = n => esc(n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase());

export const now = new Date();
export const hm = d => `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;

/* Style CSS d'un fond : image si p.src, sinon dégradé a → b */
export const bg = p => p.src ? `background:url('${esc(p.src)}') center/cover` : `background:linear-gradient(135deg,${p.a},${p.b})`;
export const gr = p => bg({ a: p.a, b: p.b });

export const dur = s => { const t = Math.round(s); return isFinite(t) ? `${t / 60 | 0}:${String(t % 60).padStart(2, "0")}` : "▶"; };
export const stamp = i => new Date(Date.now() - i * 86400000).toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) + " à " + (10 + (i % 12)) + ":" + String(i % 60).padStart(2, "0");

export const P = '<div class="h-10"></div>';
export const EMPTY = t => `<p class="py-28 text-center text-[20px] text-white/40">${t}</p>`;
