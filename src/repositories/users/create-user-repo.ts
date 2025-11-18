import { Knex } from "../../database/config.js";
import type z from "zod";
import { user_schema } from "../../utils/schemas/user-schema.js";
import { create_id } from "../../utils/utils.js";
import { hash_text } from "../../utils/encryption.js";
import { ConflictError, InternalServerError } from "../../utils/errors/app-errors.js";

type UserInput = z.infer<typeof user_schema>

async function create_user_repo({ name, email, password, birthdate, enrollment_number, institution, period, role, avatar_url, is_active }: UserInput) {

    const exist_user = await Knex("users").where({ "email": email }).first()
    if (exist_user) {
        throw new ConflictError("Email já existente no sistema!")
    }

    let hashed_password
    try {
        hashed_password = await hash_text(password)
    } catch (error) {
        console.error("Erro ao criptografar a senha:", error)
        throw new InternalServerError("Falha ao processar a senha")
    }

    const data = {
        id: create_id(),
        name,
        email,
        password: hashed_password,
        birthdate,
        enrollment_number,
        institution,
        period,
        role,
        avatar_url,
        is_active
    }

    await Knex("users").insert(data)
    const created_user = await Knex("users").select("id", "name", "email", "birthdate", "enrollment_number", "institution", "period", "role", "avatar_url", "is_active").where({ "id": data.id }).first()

    if (!created_user) {
        throw new InternalServerError("Falha ao cadastrar o usuário!")
    }

    return created_user
}

export { create_user_repo }