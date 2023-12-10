import { z } from 'zod'
import hashHex from './hash';
import * as db from "../db"

const FILTERLIST_PATH = "./lists/filtered-hashes.json"

const hashes = new Set(await Bun.file(FILTERLIST_PATH).json());
const allIds = db.getAllIds()


for (const id of allIds) {
    const hash = hashHex(id);
    if (hashes.has(hash)) {
        console.log(`filtering value "${id}" (${hash})`);
        db.deleteSprite(id);
        db.deleteDef(id);
        db.deleteQueue(id);
    }
}
