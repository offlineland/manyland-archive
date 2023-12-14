// Note: be careful running this! This can take a LOT of disk space!

import { z } from 'zod'
import * as db from "./db"
import path from 'node:path'

const dest = z.string().parse(Bun.argv[2]);
const allIds = db.getAllIds()


for (let i = 0; i < allIds.length; i++) {
    const id = allIds[i];
    console.log(i, allIds.length, id)

    db.writeSpriteToFile(id, path.join(dest, id + ".png"))
}
