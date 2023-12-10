import { z } from 'zod'
import hashHex from './hash';

const FILTERLIST_PATH = "./lists/filtered-hashes.json"

const hashes = new Set(await Bun.file(FILTERLIST_PATH).json());

const targetJsonFile = Bun.argv[2];
const toClean = z.string().array().parse(await Bun.file(targetJsonFile).json())
const cleaned = [];


for (const value of toClean) {
    const hash = hashHex(value);
    if (hashes.has(hash)) {
        console.log(`filtering value "${value}" (${hash})`);
    }
    else {
        cleaned.push(value);
    }
}

Bun.write(targetJsonFile, JSON.stringify(cleaned, null, 2));
