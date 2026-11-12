import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // chemins relatifs : le build marche sur n'importe quel hébergeur / sous-dossier
  server: { host: true } // accessible depuis ton vrai téléphone sur le réseau local
});
