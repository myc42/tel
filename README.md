# Le téléphone de Maabio (Vite + Tailwind)

```bash
npm install
npm run dev      # http://localhost:5173 (aussi accessible sur ton réseau local)
npm run build    # génère dist/ (chemins relatifs, déployable partout)
```

## Fichiers statiques → `public/`

Les chemins dans `src/data.js` sont relatifs à `public/` (sans le préfixe `public/`).

```
public/
├── icons/      messages.png photos.png notes.png contacts.png facetime.png camera.png
│               youtube.png spotify.png safari.png phone.png whatsapp.png weather.png (tiktok.png optionnel)
├── gallery/    1.jpg, 2.mp4, 3.png … (numéros croissants, scannés automatiquement)
├── profil/     maabio.jpg (ta fiche), coach.jpg, vane.jpg
├── screen/     1.webp (fond d'écran)
└── voice/      appel.mp3
```

Tout le contenu affiché (messages, contacts, notes, météo, scénario) se modifie dans `src/data.js`.
