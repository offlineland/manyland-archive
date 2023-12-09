// Usage: bun run tools/download-creation-data-cdn.ts ./lists/creations/universe-search-all.json

import { z } from 'zod'
import * as db from "./db"

const allIdsFilePath = z.string().parse(Bun.argv[2]);

// MUST end with a /
const CDN_URL_SPRITES = "";
const CDN_URL_DEFS = "";
const SLEEP_MS_CDNDL = 100;



const allIds: string[] = await Bun.file(allIdsFilePath).json();



for (let i = 0; i < allIds.length; i++) {
    const id = allIds[i];

    if (db.hasDef(id)) continue;
    console.log(new Date().toISOString(), `downloading ${id} (${i} / ${allIds.length})`);


    await fetch(CDN_URL_SPRITES + id)
        .catch(e => { // Fetch only throws when there was a network error
            console.error("Network errro while dwonloading sprite for", id, e);
            db.storeErrorCreation(id, "sprite", null)
            throw e;
        })
        .then(async res => {
            if (res.ok) {
                const blob = await res.blob();
                db.storeBlob(id, blob);
            }
            else {
                console.error("Server error while downloading sprite for", id, res.status, res.statusText);
                db.storeErrorCreation(id, "sprite", res.status)
            }
        })
        .catch(e => console.error("error saving creation sprite", e));



    await fetch(CDN_URL_DEFS + id)
        .catch(e => { // Fetch only throws when there was a network error
            console.error("Network errro while downloading def for", id, e);
            db.storeErrorCreation(id, "def", null)
            throw e;
        })
        .then(async res => {
            if (res.ok) {
                const data = await res.text();
                db.storeDef(id, data);
            }
            else {
                console.error("Server error while downloading def for", id, res.status, res.statusText);
                db.storeErrorCreation(id, "def", res.status)
            }
        })
        .catch(e => console.error("error saving creation def", e));


    await Bun.sleep(SLEEP_MS_CDNDL);
}
