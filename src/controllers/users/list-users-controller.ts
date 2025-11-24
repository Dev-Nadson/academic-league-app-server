import type { FastifyRequest, FastifyReply } from "fastify";
import { pagination_schema } from "../../utils/schemas/pagination-schema.js";
import { list_users_repo } from "../../repositories/users/list-users-repo.js";

async function list_users_controller(request: FastifyRequest, reply: FastifyReply) {
    const { page, limit } = pagination_schema.parse(request.query)

    const users = await list_users_repo({ page, limit })
    return reply.status(200).send(users)
}

export { list_users_controller }