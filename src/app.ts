import fastify, { type FastifyInstance } from "fastify";

function create_app(): FastifyInstance {
    const app = fastify()

    return app
}

export { create_app }
