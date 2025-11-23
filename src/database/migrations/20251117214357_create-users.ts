import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.string("id").primary().notNullable()
        table.string("name").notNullable()
        table.string("email").unique().notNullable()
        table.string("password").notNullable()
        table.date("birthdate").notNullable()
        table.string("enrollment_number").notNullable()
        table.string("institution").notNullable()
        table.string("period").notNullable()
        table.enum("role", ["superadmin", "president", "vice-president", "director", "member"]).defaultTo("member").notNullable()
        table.string("avatar_url").notNullable()
        table.boolean("is_active").defaultTo(true).notNullable()
        table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users")
}

