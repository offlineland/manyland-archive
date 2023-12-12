import { Database } from "bun:sqlite";


export const makeMapDB = (areaId: string) => {
    const DB_PATH = `./archives/area-placements/${areaId}.sqlite`
    const db = new Database(DB_PATH, { create: true });



    db.prepare(`CREATE TABLE IF NOT EXISTS creationRefs (
        creationRefId INTEGER PRIMARY KEY,
        creationId TEXT NOT NULL,
        UNIQUE(creationId)
    )`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS playerRefs (
        playerRefId INTEGER PRIMARY KEY,
        playerId TEXT NOT NULL,
        UNIQUE(playerId)
    )`).run()

    db.prepare(`
        CREATE TABLE IF NOT EXISTS placements (
            x INT NOT NULL,
            y INT NOT NULL,
            creationRef INT NOT NULL,
            placedBy DATE NULLABLE,
            placedAt DATE NULLABLE,
            FOREIGN KEY (creationRef) REFERENCES creationRefs(creationRefId)
            FOREIGN KEY (placedBy) REFERENCES playerRefs(playerRefId)
            UNIQUE (x, y)
        )
    `).run()
    db.prepare(`CREATE INDEX IF NOT EXISTS placements_creationref ON placements (creationRef)`).run()


    const storeCreationRef = (creationId: string) => db.query(`INSERT INTO creationRefs (creationId) VALUES (?) ON CONFLICT(creationId) DO NOTHING;`).run(creationId);
    const storePlayerRef = (playerId: string) => db.query(`INSERT INTO playerRefs (playerId) VALUES (?) ON CONFLICT(playerIdc) DO NOTHING;`).run(playerId);

    const setPlacement_ = (x: number, y: number, creationId: string) => db.query(`
        INSERT INTO placements (x, y, creationRef)
        VALUES (
            :x,
            :y,
            (SELECT creationRefId FROM creationRefs WHERE creationId = :creationId)
        )
        ON CONFLICT(x, y) DO
        UPDATE SET creationRef = (SELECT creationRefId FROM creationRefs WHERE creationId = :creationId)
        ;
    `).run(x, y, creationId)

    const setPlacement = (x: number, y: number, creationId: string) => {
        storeCreationRef(creationId);
        setPlacement_(x, y, creationId)
    }




    const setPlacer_ = (x: number, y: number, placedBy: string, placedAt: Date) => {
        throw new Error("not implemented")
    }
    
    const setPlacer = (x: number, y: number, placedBy: string, placedAt: Date) => {
        storePlayerRef(placedBy)
        setPlacer_(x, y, placedBy, placedAt)
    }




    const getPlacements = () => {
        db.query(`
            SELECT x, y, creationRefs.creationId AS creationId, playerRefs.playerId AS placedBy, placedAt
            FROM placements
            JOIN creationRefs ON placements.creationRef = creationRefs.creationRefId
            JOIN playerRefs ON placements.placedBy = playerRefs.playerRefId
            ;
        `)
    }




    return {
        setPlacement,
        setPlacer,
        getPlacements,
    }
}
