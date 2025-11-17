import "dotenv/config"
import z from "zod"

const env_schema = z.object({
    PORT: z.number().positive().default(3000),
    HOST: z.string().min(1).default("0.0.0.0"),
    DATABASE_URL: z.url().min(1),
    BCRYPT_ROUNDS: z.coerce.number().min(10).max(15).default(10)
})

const env = env_schema.parse(process.env)

export { env }