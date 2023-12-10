import { Database } from "bun:sqlite";
import { isFiltered } from "./filtering/utils";

// TODO: might want to split it into multiple dbs to not have to re-up the whole thing each time unrelated data is added
const DB_PATH = "./databases/creations.sqlite"
const db = new Database(DB_PATH, { create: true });


// Sorry for all the boilerplate

db.query(`create table if not exists sprites (id TEXT PRIMARY KEY, value BLOB );`).run();
const storeBlobStmt = db.query(`insert or ignore into sprites VALUES (?, ?);`);
const storeBlob_ = (id: string, blob: Uint8Array) => {
    if (isFiltered(id)) return;

    storeBlobStmt.run(id, blob);
}
export const storeBlob = async (id: string, blob: Blob) => storeBlob_(id, new Uint8Array(await blob.arrayBuffer()));
const getSpriteStmt = db.prepare(`SELECT value FROM sprites WHERE id = ?`)
const getSprite_ = (id: string) => getSpriteStmt.get(id) as { value: Uint8Array } | null;
const getSprite = (id: string): Blob | null => {
    const res = getSprite_(id);
    if (!res) return null;

    return new Blob([ res.value ])
}
export const writeSpriteToFile = (id: string, path: string) => {
    const res = getSprite_(id);
    if (!res) return false;

    Bun.write(path, res.value);
    return true;
}
const deleteSpriteStmt = db.prepare(`DELETE * FROM sprites WHERE id = ?`)
export const deleteSprite = (id: string) => deleteSpriteStmt.run(id);


db.query(`create table if not exists defs (id TEXT PRIMARY KEY, value JSON);`).run();
const storeDefStmt = db.query(`insert or ignore into defs VALUES (?, ?);`);
export const storeDef = (id: string, def: any) => {
    if (isFiltered(id)) return;

    storeDefStmt.run(id, def);
}
const hasStmt = db.query(`select 1 from defs WHERE id = ? LIMIT 1;`);
export const hasDef = (id: string) => hasStmt.get(id) !== null;
const getAllIdsStmt = db.query("SELECT id FROM defs;");
export const getAllIds = () => getAllIdsStmt.values().flat() as string[];
const deleteDefStmt = db.prepare(`DELETE * FROM defs WHERE id = ?`)
export const deleteDef = (id: string) => deleteDefStmt.run(id);


db.query(`create table if not exists queue ( id TEXT PRIMARY KEY );`).run();
const addToQueueStmt = db.query(`insert or ignore into queue VALUES (?);`);
export const addToQueue = (id: string) => {
    if (isFiltered(id)) return;

    addToQueueStmt.run(id);
}
const getQueuePageStmt = db.query(`SELECT id FROM queue LIMIT 50 OFFSET ?;`);
export let getQueuePage = (page: number) => getQueuePageStmt.values( 50 * page ) as [string][];
const deleteQueueStmt = db.prepare(`DELETE * FROM queue WHERE id = ?`)
export const deleteQueue = (id: string) => deleteQueueStmt.run(id);


db.query(`create table if not exists errors_creations (id TEXT PRIMARY KEY, type TEXT, statusCode INTEGER);`).run();
const storeError = db.query(`insert or ignore into errors_creations VALUES (?, ?, ?);`);
export const storeErrorCreation = (id: string, type: "sprite" | "def", statusCode: number | null) => storeError.run(id, type, statusCode);
