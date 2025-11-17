import knex from "knex";
import config from "../../knexfile.js"

const Knex = knex(config)

export { Knex }
