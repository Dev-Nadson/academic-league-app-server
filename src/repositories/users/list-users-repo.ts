import type z from "zod";
import { Knex } from "../../database/config.js";
import { pagination_schema } from "../../utils/schemas/pagination-schema.js";

type PaginationInput = z.infer<typeof pagination_schema>

async function list_users_repo({ page, limit }: PaginationInput) {
    const users = await Knex("users").select("*")

    return users
}

export { list_users_repo }