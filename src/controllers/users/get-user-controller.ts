import type { FastifyRequest, FastifyReply } from "fastify";
import { user_params_schema } from "../../utils/schemas/user-schema.js";
import { get_user_repo } from "../../repositories/users/get-user-repo.js";

async function get_user_controller(request: FastifyRequest, reply: FastifyReply) {
    const { id } = user_params_schema.parse(request.params)

    const user = await get_user_repo({ id })

    return reply.status(200).send({
        message: "Dados do usuário",
        data: user
    })
}

export { get_user_controller }
