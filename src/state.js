/* État partagé entre les modules (remplace les variables globales de l'ancien script) */
export const S = {
  locked: true,   // écran verrouillé ?
  cur: -1,        // piste Spotify en cours
  play: false,    // lecture en cours ?
  au: null,       // objet Audio de la piste
  galReady: false,// scan de la galerie terminé ?
  numStr: "",     // numéro composé au clavier
  ytOn: false     // faux lecteur YouTube en lecture ?
};
