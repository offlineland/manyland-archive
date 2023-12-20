import hashHex from "./filtering/hash";

const SNAPS_FILE_PATH = "./archives/snaps.json"
const snaps = await Bun.file(SNAPS_FILE_PATH).json();

const cleaned = [];

var dateFromObjectId = function (objectId: string) {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

for (const snap of snaps) {
    snap.date = dateFromObjectId(snap._id).toISOString();

    snap.playerId = "sha1." + hashHex(snap.playerId);

    if (snap.areaId.length > 1) {
        snap.areaId = "sha1." + hashHex(snap.areaId);
    }

    cleaned.push(JSON.stringify(snap));
}

Bun.write(SNAPS_FILE_PATH, "[\n" + cleaned.join(',\n') + '\n]');
