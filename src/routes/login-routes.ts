import type { FastifyInstance } from "fastify";

async function login_routes(app: FastifyInstance) {
    app.post("/login", () => { })
    app.post("/refresh-token", () => { })
    app.post("/forgot-password", () => { })
    app.post("/reset-password", () => { })
}
export { login_routes }