/* Registre des vues : la clé est le nom utilisé dans data-go="nom:argument" / data-open / data-tab */
import * as messages from "./messages.js";
import * as photos from "./photos.js";
import * as notes from "./notes.js";
import * as contacts from "./contacts.js";
import * as facetime from "./facetime.js";
import * as calendar from "./calendar.js";
import * as camera from "./camera.js";
import * as media from "./media.js";
import * as phone from "./phone.js";
import * as whatsapp from "./whatsapp.js";
import * as weather from "./weather.js";

export const V = {
  ...messages, ...photos, ...notes, ...contacts, ...facetime, ...calendar,
  ...camera, ...media, ...phone, ...whatsapp, ...weather
};
