import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../utils/errors/app-errors.js";
import { ZodError } from "zod";
import z from "zod";


async function error_handler_middleware(error: unknown, request: FastifyRequest, reply: FastifyReply) {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            error: "Dados Inválidos",
            issues: z.treeifyError(error)
        })
    }

    if (error instanceof AppError) {
        return reply.status(error.status_code).send({
            error: error.name,
            issues: error.message
        })
    }

    console.error(`Erro sem tratamento: ${error}`)
    return reply.status(500).send({ error: 'Erro interno no servidor' })
}

export { error_handler_middleware }