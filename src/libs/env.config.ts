import "dotenv/config"
import z from "zod"

const env_schema = z.object({
    PORT: z.number().positive().default(3000),
    HOST: z.string().min(1).default("0.0.0.0")
})

const env = env_schema.parse(process.env)

export { env }