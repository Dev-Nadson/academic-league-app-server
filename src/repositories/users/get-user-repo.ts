import z from "zod"
import { Knex } from "../../database/config.js";
import type { user_params_schema } from "../../utils/schemas/user-schema.js";

type user_params_type = z.infer<typeof user_params_schema>

async function get_user_repo({ id }: user_params_type) {
    const user = Knex("users as u").select("*").where({ "u.id": id })

    return user
}

export { get_user_repo }