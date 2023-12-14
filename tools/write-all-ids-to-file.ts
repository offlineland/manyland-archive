// Usage: bun run tools/write-all-ids-to-file.ts archives/creations/all-ids-in-db.json

import { z } from 'zod'
import * as db from "./db"

const dest = z.string().parse(Bun.argv[2]);
const allIds = db.getAllIds()
await Bun.write(dest, JSON.stringify(allIds, null, 2))
