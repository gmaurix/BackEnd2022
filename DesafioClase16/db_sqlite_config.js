const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./ecommerce.sqlite3",
  },
  useNullAsDefault : true,
});

module.exports = knex;
