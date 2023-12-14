import * as db from "./db"
import * as dbQueue from "./db-queue"
import { downloadCreation } from './download-creation';
import { retryOnThrow } from "./utils";


let page = 0;


while (true) {
    const allIds = dbQueue.getQueuePage(page)
    for (const id of allIds) {
        if (db.hasDef(id)) continue;
        if (db.hasErroredCreation(id)) continue;
        console.log(new Date().toISOString(), `downloading ${id} (page ${page})`);
        await retryOnThrow(() => downloadCreation(id))
    }

    if (allIds.length < 50) break;
    page++;
}
