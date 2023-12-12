import { z } from 'zod'
import * as db from "./db"
import { downloadAttachedData } from './download-creation';

const allIds = db.getAllIds()


for (let i = 0; i < allIds.length; i++) {
    const id = allIds[i];
    const def = await db.getDef(id);
    console.log(id, i, allIds.length);

    await downloadAttachedData(def);
}
