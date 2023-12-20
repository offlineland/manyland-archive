import { z } from 'zod'
import hashHex from './hash';
import * as db from "../db"
import * as dbQueue from "../db-queue"

const FILTERLIST_PATH = "./archives/filtered-hashes.json"

const hashes = new Set(await Bun.file(FILTERLIST_PATH).json());
const allIds = db.getAllIds()


for (const id of allIds) {
    const hash = hashHex(id);
    if (hashes.has(hash)) {
        console.log(`filtering value "${id}" (${hash})`);
        db.deleteSprite(id);
        db.deleteDef(id);
        dbQueue.deleteQueue(id);
    }
}
