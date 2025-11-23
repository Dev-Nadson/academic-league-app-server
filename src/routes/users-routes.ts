import type { FastifyInstance } from "fastify";
import { list_users_controller } from "../controllers/users/list-users-controller.js";
import { create_user_controller } from "../controllers/users/create-user-controller.js";

async function users_routes(app: FastifyInstance) {
    app.get("/", list_users_controller)
    app.get("/:id", () => { })
    app.post("/", create_user_controller)
    app.put("/:id", () => { })
    app.patch("/:id/status", () => { })
    app.delete("/:id", () => { })
}

export { users_routes }