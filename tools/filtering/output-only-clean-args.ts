import hashHex from "./hash";

const FILTERLIST_PATH = "./archives/filtered-hashes.json"

const args = Bun.argv.slice(2);
const hashes = new Set(await Bun.file(FILTERLIST_PATH).json());

for (const arg of args) {
    const hash = hashHex(arg);

    if (hashes.has(hash)) {
        console.error(`filtering value "${arg}" (${hash})`);
    }
    else {
        console.log(arg);
    }
}
