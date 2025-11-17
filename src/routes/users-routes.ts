import type { FastifyInstance } from "fastify";

async function users_routes(app: FastifyInstance) {
    app.get("/", () => { })
    app.get("/:id", () => { })
    app.post("/", () => { })
    app.put("/:id", () => { })
    app.patch("/:id/status", () => { })
    app.delete("/:id", () => { })
}

export { users_routes }