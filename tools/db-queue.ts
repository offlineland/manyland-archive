import { Database } from "bun:sqlite";
import { isFiltered } from "./filtering/utils";
import { hasDef } from "./db";


const DB_QUEUE_PATH = "./local-creations-queue.sqlite"
const dbQueue = new Database(DB_QUEUE_PATH, { create: true });
dbQueue.query(`create table if not exists queue ( id TEXT PRIMARY KEY );`).run();
export const addToQueue = (id: string) => {
    if (isFiltered(id)) return;
    if (hasDef(id)) return;

    dbQueue.query(`insert or ignore into queue VALUES (?);`).run(id);
}
export const getQueuePage = (page: number) => (dbQueue.query(`SELECT id FROM queue LIMIT 50 OFFSET ?;`).values( 50 * page ) as [string][]).flat();
export const deleteQueue = (id: string) => dbQueue.query(`DELETE FROM queue WHERE id = ?`).run(id);
