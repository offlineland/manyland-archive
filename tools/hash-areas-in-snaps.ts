const SNAPS_FILE_PATH = "./archives/snaps.json"
const snaps = await Bun.file(SNAPS_FILE_PATH).json();

const cleaned = [];


for (const snap of snaps) {
    if (snap.areaId.length > 1) {
        const hasher = new Bun.CryptoHasher("sha1");
        hasher.update(snap.areaId, "utf-8");
        const areaIdHash = hasher.digest("hex");

        snap.areaId = "sha1." + areaIdHash;
    }

    cleaned.push(JSON.stringify(snap));
}

Bun.write(SNAPS_FILE_PATH, "[\n" + cleaned.join('\n') + '\n]');
