import type { FastifyRequest, FastifyReply } from "fastify";
import { user_schema } from "../../utils/schemas/user-schema.js";
import { create_user_repo } from "../../repositories/users/create-user-repo.js";

async function create_user_controller(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, birthdate, enrollment_number, institution, period, role, avatar_url, is_active } = user_schema.parse(request.body)

    const wow = await create_user_repo({ name, email, password, birthdate, enrollment_number, institution, period, role, avatar_url, is_active })
    return wow
}

export { create_user_controller }