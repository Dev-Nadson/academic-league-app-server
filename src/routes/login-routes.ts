import type { FastifyInstance } from "fastify";

async function login_routes(app: FastifyInstance) {
    app.post("/", () => { })
}
export { login_routes }