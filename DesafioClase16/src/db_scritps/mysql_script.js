const knex = require("../../db_mysql");

async function createTable() {
  try {
    const resp = await knex.schema.createTable("productos", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.integer("price");
      table.string("thumbnail");
    });
    console.log("tabla creada");
  } catch (error) {
    console.log(error);
  }
}

createTable();
