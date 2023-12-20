// Usage: bun run tools/download-creation-data-cdn.ts ./archives/creations/universe-search-all.json

import { z } from 'zod'
import * as db from "./db"
import { downloadCreation } from './download-creation';

const allIdsFilePath = z.string().parse(Bun.argv[2]);
const allIds: string[] = await Bun.file(allIdsFilePath).json();

for (let i = 0; i < allIds.length; i++) {
    const id = allIds[i];

    if (db.hasDef(id)) continue;
    console.log(new Date().toISOString(), `downloading ${id} (${i} / ${allIds.length})`);

    await downloadCreation(id)
}
