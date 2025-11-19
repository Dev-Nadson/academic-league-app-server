import fastify, { type FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import cors from '@fastify/cors'
import { error_handler_middleware } from "./middlewares/error-handler-middleware.js";
import { app_routes } from "./routes/index-routes.js";
import { env } from "./libs/env.config.js";

function create_app(): FastifyInstance {
    const app = fastify()

    app.register(fastifySwagger), {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Academic League API',
                description: 'Documentando a API de gerenciamento de liga acadêmica com swagger',
                version: '1.0.0'
            },
            servers: [
                {
                    url: 'http://localhost:4000',
                }
            ],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'code', description: 'Code related end-points' }
            ],
            components: {
                securitySchemes: {
                    apiKey: {
                        type: 'apiKey',
                        name: 'apiKey',
                        in: 'header'
                    }
                }
            },
        }
    }

    app.register(fastifySwaggerUI, { routePrefix: "/docs" })
    app.register(cors, { origin: env.ORIGINS, credentials: true })
    app.setErrorHandler(error_handler_middleware)
    app.register(app_routes)

    return app
}

export { create_app }
