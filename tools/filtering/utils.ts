import hashHex from "./hash";

const FILTERLIST_PATH = "./archives/filtered-hashes.json"
const hashes = new Set(await Bun.file(FILTERLIST_PATH).json());

export const isFiltered = (value: string) => {
    const hash = hashHex(value);
    
    return hashes.has(hash);
}
