const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "desafio_clase_16",
    table: "productos",
  },
  pool: { min: 1, max: 8 },
});

module.exports = knex;
