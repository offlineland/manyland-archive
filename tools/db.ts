import { Database } from "bun:sqlite";

// TODO: might want to split it into multiple dbs to not have to re-up the whole thing each time unrelated data is added
const DB_PATH = "./databases/creations.sqlite"
const db = new Database(DB_PATH, { create: true });


// Sorry for all the boilerplate

db.query(`create table if not exists sprites (id TEXT PRIMARY KEY, value BLOB );`).run();
const storeBlobStmt = db.query(`insert or ignore into sprites VALUES (?, ?);`);
const storeBlob_ = (id: string, blob: Uint8Array) => storeBlobStmt.run(id, blob);
export const storeBlob = async (id: string, blob: Blob) => storeBlob_(id, new Uint8Array(await blob.arrayBuffer()));
const getSpriteStmt = db.prepare(`SELECT value FROM sprites WHERE id = ?`)
const getSprite_ = (id: string) => getSpriteStmt.get(id) as Uint8Array | null;
const getSprite = (id: string): Blob | null => {
    const res = getSprite_(id);
    if (!res) return null;

    return new Blob([ res ])
}
export const writeSpriteToFile = (id: string, path: string) => {
    const sprite = getSprite_(id);
    if (!sprite) return false;

    Bun.write(path, sprite);
    return true;
}


db.query(`create table if not exists defs (id TEXT PRIMARY KEY, value JSON);`).run();
const storeDefStmt = db.query(`insert or ignore into defs VALUES (?, ?);`);
export const storeDef = (id: string, def: any) => storeDefStmt.run(id, def);
const hasStmt = db.query(`select 1 from defs WHERE id = ? LIMIT 1;`);
export const hasDef = (id: string) => hasStmt.get(id) !== null;


db.query(`create table if not exists queue ( id TEXT PRIMARY KEY );`).run();
const addToQueueStmt = db.query(`insert or ignore into queue VALUES (?);`);
export const addToQueue = (id: string) => addToQueueStmt.run(id);
const getQueuePageStmt = db.query(`SELECT id FROM queue LIMIT 50 OFFSET ?;`);
export let getQueuePage = (page: number) => getQueuePageStmt.values( 50 * page ) as [string][];


db.query(`create table if not exists errors_creations (id TEXT PRIMARY KEY, type TEXT, statusCode INTEGER);`).run();
const storeError = db.query(`insert or ignore into errors_creations VALUES (?, ?, ?);`);
export const storeErrorCreation = (id: string, type: "sprite" | "def", statusCode: number | null) => storeError.run(id, type, statusCode);
