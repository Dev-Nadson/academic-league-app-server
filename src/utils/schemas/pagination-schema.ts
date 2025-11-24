import z from "zod";

const pagination_schema = z.object({
    page: z.coerce.number().positive().default(1),
    limit: z.coerce.number().default(10),
    term: z.string().optional()
})

export { pagination_schema }