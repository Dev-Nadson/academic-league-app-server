import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("activities", (table) => {
        table.string("id").primary().notNullable()
        table.string("title").notNullable()
        table.string("description")
        table.enum("status", ["pending", "completed", "overdue"]).defaultTo("pending").notNullable()
        table.enum("priority", ["low", "medium", "high", "urgent"]).defaultTo("medium").notNullable()
        table.timestamp("due_date").notNullable()
        table.string("created_by").references("id").inTable("users").notNullable()
        table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
        table.timestamp("completed_at").defaultTo(null)
    })

    await knex.schema.createTable("activity_assignments", (table) => {
        table.string("id").primary().notNullable()
        table.string("activity_id").references("id").inTable("activities").notNullable()
        table.string("user_id").references("id").inTable("users").notNullable()
        table.timestamp("assigned_at").defaultTo(knex.fn.now()).notNullable()
        table.string("assigned_by").references("id").inTable("users").notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("activity_assignments")
    await knex.schema.dropTable("activities")
}

