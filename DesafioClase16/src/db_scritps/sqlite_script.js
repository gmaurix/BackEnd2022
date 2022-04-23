const knex = require("../../db_sqlite_config");

/* fn para crear tabla */
async function createTable() {
  try {
    const resp = await knex.schema.createTable("mensajes", (table) => {
      table.increments("id").primary();
      table.string("autor");
      table.string("mensaje");
      table.string("fyh");
    });
    console.log("tabla creada");
  } catch (error) {
    console.log(error);
  }
}

createTable();
