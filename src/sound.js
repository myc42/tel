/* Petits sons générés avec WebAudio (aucun fichier nécessaire) */
let ac;

export const tone = (f, d0, d, v = .18) => {
  ac ??= new (window.AudioContext || window.webkitAudioContext)();
  if (ac.state === "suspended") ac.resume();
  const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + d0;
  o.frequency.value = f; o.connect(g); g.connect(ac.destination);
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.start(t); o.stop(t + d + .05);
};

export const ringOnce = () => {
  [1047, 1319, 1175, 1568, 1047, 1319, 1175, 1568].forEach((f, i) => tone(f, i * .16 + (i > 3 ? .3 : 0), .3));
  navigator.vibrate?.([300, 150, 300]);
};
