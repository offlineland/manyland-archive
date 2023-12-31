import * as db from "./db"
import * as dbQueue from "./db-queue"
import * as api from "./api"
import { retryOnThrow } from './utils';
import { CreationDef, HolderContents, Motions, MultiContents } from "./schemas";

// MUST end with a /
const CDN_URL_SPRITES = "https://archival.offlineland.io/creations/sprite/";
const CDN_URL_DEFS = "https://archival.offlineland.io/creations/def/";
const SLEEP_MS_CDNDL = 0;
const SLEEP_CREATIONDL_API = 800;





export const downloadAttachedData = async (def: CreationDef) => {
    const id = def.id;

    if (def.base === "HOLDER" && !db.hasHolderData(id)) {
        console.log(`Creation "${def.name}" is a holder, fetching content`);
        const data = HolderContents.parse(await retryOnThrow(() => api.getHolderContent(def.id)));

        for (const content of data.contents) {
            dbQueue.addToQueue(content.itemId);
        }

        db.storeHolderContent(id, data.contents)
        //zip.file("holders/" + id + ".json", JSON.stringify(data), { binary: false, });
        //db.setHolder(id, JSON.stringify(data));

        await Bun.sleep(SLEEP_CREATIONDL_API);
        console.log(`Creation "${def.name}" is a holder, fetching content done`);
    }
    if (def.base === "MULTITHING") {
        console.log(`Creation "${def.name}" is a multi, fetching content`);
        const data_ = await retryOnThrow(() => api.getMultiData(def.id));
        const data = MultiContents.parse(data_)

        if (data.data) {
            for (const { id } of data.data.itemProps) {
                dbQueue.addToQueue(id);
            }

            await Bun.write("./archives/creations/multicontents/" + id + ".json", JSON.stringify(data_.data))
        }
        //zip.file("multis/" + id + ".json", JSON.stringify(data), { binary: false, });
        //db.setMulti(id, JSON.stringify(data));

        await Bun.sleep(SLEEP_CREATIONDL_API);
        console.log(`Creation "${def.name}" is a multi, fetching content done`);
    }
    else if (def.base === "STACKWEARB" && !db.hasMotionData(id)) {
        console.log(`Creation "${def.name}" is a body, fetching motion bar`);
        const data_ = await retryOnThrow(() => api.getBodyMotions(def.id));
        const data = Motions.parse(data_);

        if (data.ids !== null) {
            for (const id of data.ids) {
                dbQueue.addToQueue(id);
            }
        }

        db.storeBodyMotions(id, data.ids)
        //zip.file("motions/" + id + ".json", JSON.stringify(data), { binary: false, });
        await Bun.sleep(50);
        console.log(`Creation "${def.name}" is a body, fetching motion bar done`);
    }

    // get from props
    if (def.props?.clonedFrom) dbQueue.addToQueue(def.props.clonedFrom)
    if (def.props?.changerId) dbQueue.addToQueue(def.props.changerId)
    if (def.props?.emitsId) dbQueue.addToQueue(def.props.emitsId)
    if (def.props?.motionId) dbQueue.addToQueue(def.props.motionId)
    if (def.props?.environmentId) dbQueue.addToQueue(def.props.environmentId)
    if (def.props?.getId) dbQueue.addToQueue(def.props.getId)
    if (def.props?.hasId) dbQueue.addToQueue(def.props.hasId)
    if (def.props?.holdableId) dbQueue.addToQueue(def.props.holdableId)
    if (def.props?.wearableId) dbQueue.addToQueue(def.props.wearableId)
    if (def.props?.thingRefs) {
        for (const [id] of def.props.thingRefs) {
            dbQueue.addToQueue(id);
        }
    }
}


export const downloadCreation = async (id: string) => {
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

                try {
                    const json = CreationDef.parse(JSON.parse(data))
                    await downloadAttachedData(json)
                    db.storeDef(id, data);
                } catch(e) {
                    console.error("error parsing creation", data, e);
                    db.storeErrorCreation(id, "def", null);
                }
            }
            else {
                console.error("Server error while downloading def for", id, res.status, res.statusText);
                db.storeErrorCreation(id, "def", res.status)
            }
        })
        .catch(e => console.error("error saving creation def", e));

    await Bun.sleep(SLEEP_MS_CDNDL)
}
