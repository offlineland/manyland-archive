import { z } from 'zod'
import * as db from "./db"

const id = z.string().parse(Bun.argv[2]);
db.writeSpriteToFile(id, `./${id}.png`);

