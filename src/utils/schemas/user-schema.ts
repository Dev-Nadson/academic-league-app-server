import z from "zod"

const user_schema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8).max(64).trim(),
    birthdate: z.string(),
    enrollment_number: z.string(),
    institution: z.string(),
    period: z.string(),
    role: z.string(),
    avatar_url: z.string().optional(),
    is_active: z.boolean(),
})

export { user_schema } 