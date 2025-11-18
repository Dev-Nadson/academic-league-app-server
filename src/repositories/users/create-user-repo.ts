import knex from "knex";
import type z from "zod";
import { user_schema } from "../../utils/schemas/user-schema.js";
import { create_id } from "../../utils/utils.js";
import { hash_text } from "../../utils/encryption.js";

type UserInput = z.infer<typeof user_schema>

async function create_user_repo(user: UserInput) {
    const { name, email, password, birthdate, enrollment_number, institution, period, role, avatar_url, is_active } = user

    let hashed_password
    try {
        hashed_password = await hash_text(password)
    } catch (error) {
        console.error("Erro ao criptografar a senha:", error)
        throw new Error("Falha ao processar a senha")
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

    await knex("user").insert(data)
    const created_user = await knex("user").select()

    return created_user
}

export { create_user_repo }