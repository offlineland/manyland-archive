import hashHex from "./hash";

const FILTERLIST_PATH = "./archives/filtered-hashes.json"

const args = Bun.argv.slice(2);
const hashes = new Set(await Bun.file(FILTERLIST_PATH).json())

for (const arg of args) {
    const hash = hashHex(arg);
    console.log("hash of", arg, ":", hash);
    hashes.add(hash);
}

Bun.write(FILTERLIST_PATH, JSON.stringify([...hashes].sort(), null, 2));
