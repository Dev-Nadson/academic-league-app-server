import type { FastifyRequest, FastifyReply } from "fastify";
import { login_schema } from "../../utils/schemas/login-schema.js";

async function create_login_controller(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = login_schema.parse(request)

    return reply.status(200).send()
}