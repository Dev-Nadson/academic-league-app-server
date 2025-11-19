import { create_app } from "./app.js";
import { env } from "./libs/env.config.js";

const app = create_app()

app.listen({ port: env.PORT, host: env.HOST }).then(() => {
    console.log(`Server is running on port: ${env.PORT}`)
    console.log(`Acess on url: http://localhost:${env.PORT}`)
    console.log(`docs on url: http://localhost:${env.PORT}/docs`)
})
