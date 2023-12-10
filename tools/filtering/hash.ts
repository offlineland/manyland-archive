const hashHex = (value: string) => {
    const hasher = new Bun.CryptoHasher("sha1");
    hasher.update(value, "utf-8");
    return hasher.digest("hex");
}

export default hashHex;
