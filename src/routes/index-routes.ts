import type { FastifyInstance } from "fastify";
import { login_routes } from "./login-routes.js";
import { users_routes } from "./users-routes.js";

async function app_routes(app: FastifyInstance) {
    app.register(login_routes, { prefix: "/auth" })
    app.register(users_routes, { prefix: "/users" })
}

export { app_routes }