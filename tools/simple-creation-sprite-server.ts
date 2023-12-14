import * as db from "./db"
import { MongoId } from "./schemas";

Bun.serve({
    fetch(request, server) {
        const url = new URL(request.url);

        try {
            const id = MongoId.parse(url.pathname.slice(1));
            console.log("serving sprite for", id)

            return new Response(db.getSprite(id), {
                headers: {
                    "Content-Type": "image/png"
                }
            })
        } catch(e) {
            console.error(e);
            return new Response("error", { status: 500})
        }
        
    },
    port: process.env.PORT || 3000,
})
