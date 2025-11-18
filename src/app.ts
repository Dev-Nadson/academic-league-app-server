import fastify, { type FastifyInstance } from "fastify";
import cors from '@fastify/cors'
import { app_routes } from "./routes/index-routes.js";
import { env } from "./libs/env.config.js";


function create_app(): FastifyInstance {
    const app = fastify()

    app.register(cors, { origin: env.ORIGINS, credentials: true })
    app.register(app_routes)

    return app
}

export { create_app }
