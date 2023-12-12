import { Database } from "bun:sqlite";
import { isFiltered } from "./filtering/utils";
import { HolderContent } from "./schemas";

// TODO: might want to split it into multiple dbs to not have to re-up the whole thing each time unrelated data is added
const DB_PATH = "./databases/creations.sqlite"
const db = new Database(DB_PATH, { create: true });


// Sorry for all the boilerplate

db.query(`create table if not exists sprites (id TEXT PRIMARY KEY, value BLOB );`).run();
const storeBlob_ = (id: string, blob: Uint8Array) => {
    if (isFiltered(id)) return;

    db.query(`insert or ignore into sprites VALUES (?, ?);`).run(id, blob);
}
export const storeBlob = async (id: string, blob: Blob) => storeBlob_(id, new Uint8Array(await blob.arrayBuffer()));
const getSprite_ = (id: string) => db.prepare(`SELECT value FROM sprites WHERE id = ?`).get(id) as { value: Uint8Array } | null;
export const getSprite = (id: string): Blob | null => {
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
export const deleteSprite = (id: string) => db.prepare(`DELETE FROM sprites WHERE id = ?`).run(id);




db.query(`create table if not exists defs (id TEXT PRIMARY KEY, value JSON);`).run();
export const storeDef = (id: string, def: any) => {
    if (isFiltered(id)) return;

    db.query(`insert or ignore into defs VALUES (?, ?);`).run(id, def);
}
export const hasDef = (id: string) => db.query(`select 1 from defs WHERE id = ? LIMIT 1;`).get(id) !== null;
export const getDef = (id: string) => JSON.parse((db.query(`SELECT value FROM defs WHERE id = ?`).get(id) as { value: string }).value);
export const deleteDef = (id: string) => db.query(`DELETE FROM defs WHERE id = ?`).run(id);
export const getAllIds = () => db.query("SELECT id FROM defs;").values().flat() as string[];


db.query(`create table if not exists queue ( id TEXT PRIMARY KEY );`).run();
export const addToQueue = (id: string) => {
    if (isFiltered(id)) return;
    if (hasDef(id)) return;

    db.query(`insert or ignore into queue VALUES (?);`).run(id);
}
export const getQueuePage = (page: number) => (db.query(`SELECT id FROM queue LIMIT 50 OFFSET ?;`).values( 50 * page ) as [string][]).flat();
export const deleteQueue = (id: string) => db.query(`DELETE FROM queue WHERE id = ?`).run(id);


db.query(`create table if not exists errors_creations (id TEXT PRIMARY KEY, type TEXT, statusCode INTEGER);`).run();
const storeError = db.query(`insert or ignore into errors_creations VALUES (?, ?, ?);`);
export const storeErrorCreation = (id: string, type: "sprite" | "def", statusCode: number | null) => storeError.run(id, type, statusCode);




db.query(`create table if not exists bodymotions (id TEXT PRIMARY KEY, contents JSON);`).run();
export const hasMotionData = (id: string) => db.query(`select 1 from bodymotions WHERE id = ? LIMIT 1;`).get(id) !== null;
export const storeBodyMotions = (id: string, contents: null | string[]) => {
    db.query("INSERT INTO bodymotions VALUES (?, ?)").run(id, contents === null ? null : JSON.stringify(contents))
}

db.query(`create table if not exists holdercontents (id TEXT PRIMARY KEY, contents JSON);`).run();
export const hasHolderData = (id: string) => db.query(`select 1 from holdercontents WHERE id = ? LIMIT 1;`).get(id) !== null;
export const storeHolderContent = (id: string, contents: HolderContent[] | null) => {
    db.query("INSERT INTO holdercontents VALUES (?, ?)").run(id, contents === null ? null : JSON.stringify(contents))
}

db.query(`create table if not exists multicontents (id TEXT PRIMARY KEY, contents JSON);`).run();
