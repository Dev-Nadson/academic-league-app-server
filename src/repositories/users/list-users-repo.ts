import type z from "zod";
import { pagination_schema } from "../../utils/schemas/pagination-schema.js";
import { pagination } from "../../libs/pagination.js";

type PaginationInput = z.infer<typeof pagination_schema>

async function list_users_repo(pages: PaginationInput) {
    const users = await pagination("users as u", pages, ["u.id", "u.name", "u.email", "u.birthdate", "u.enrollment_number", "u.institution", "u.period", "u.role", "u.avatar_url", "u.is_active"])
    return users
}

export { list_users_repo }