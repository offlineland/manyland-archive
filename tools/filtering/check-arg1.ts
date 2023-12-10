import hashHex from "./hash";

const FILTERLIST_PATH = "./lists/filtered-hashes.json"

const hashes = new Set(await Bun.file(FILTERLIST_PATH).json());

const arg = Bun.argv[2];
const hash = hashHex(arg);

if (hashes.has(hash)) {
    process.exit(1)
}
