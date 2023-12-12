import { z } from 'zod'
import { MongoId } from '../schemas';
import { makeMapDB } from '../db-map';
const csvSchema = z.tuple([z.coerce.number(), z.coerce.number(), MongoId])

const areaId = Bun.argv[2];
const csvFile = Bun.argv[3];
const lines = await Bun.file(csvFile).text().then(s => s.split('\n'))

const mapDB = makeMapDB(areaId);



for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    console.log(i, lines.length, line)
    if (!line) continue;

    const parseRes = csvSchema.safeParse(line.split(','))

    if (parseRes.success === false) {
        console.log("unable to parse line")
        continue;
    }

    const [x, y, creationId] = parseRes.data;

    mapDB.setPlacement(x, y, creationId);
}
