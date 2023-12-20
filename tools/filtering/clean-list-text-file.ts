import { z } from 'zod'
import hashHex from './hash';

const FILTERLIST_PATH = "./archives/filtered-hashes.json"

const hashes = new Set(await Bun.file(FILTERLIST_PATH).json());

const targetFile = Bun.argv[2];
const toClean = await Bun.file(targetFile).text().then(s => s.split("\n"))
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

Bun.write(targetFile, cleaned.join('\n'));
