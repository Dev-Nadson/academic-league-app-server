import type { FastifyInstance } from "fastify";
import { create_user_controller } from "../controllers/users/create-user-controller.js";

async function users_routes(app: FastifyInstance) {
    app.get("/", () => { console.log("oi") })
    app.get("/:id", () => { })
    app.post("/", create_user_controller)
    app.put("/:id", () => { })
    app.patch("/:id/status", () => { })
    app.delete("/:id", () => { })
}

export { users_routes }