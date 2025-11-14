import z from "zod"

const login_schema = z.object({
    email: z.email().min(10).trim(),
    password: z.string().min(8).max(64).trim()
})

export { login_schema } 