export const retryOnThrow = async <T>(fn: () => T, sleepMs: number = 300, maxAttempts: number = 3): Promise<T> => {
    let errors: any[] = [];

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch(e) {
            console.warn("retry: function failed! Attempts left:", maxAttempts - attempt)
            errors.push(e);
            await Bun.sleep(sleepMs);
        }
    }

    console.warn("retry: all attemps failed!", errors)
    throw errors.at(-1);
}
