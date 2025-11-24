import z from "zod";
import { Knex } from "../database/config.js";
import type { pagination_schema } from "../utils/schemas/pagination-schema.js";

type QueryInput = z.infer<typeof pagination_schema>

async function pagination(table_name: string, pages: QueryInput, select_properties?: string[]) {
    const { page, limit, term } = pages
    const offset = limit * (page - 1)

    const [count, data] = await Promise.all([
        Knex(table_name).count("* as total").first(),
        Knex(table_name).select(select_properties || "*").offset(offset).limit(limit)
    ])

    const total = Number(count?.total ?? 0)
    const total_pages = Math.ceil(total / limit)

    return {
        pagination: { page, limit, total, total_pages },
        data: data
    }
}

export { pagination }