const knex = require("../../db_mysql");

//listar todos los productos
async function getAll() {
  try {
    const resp = await knex.select("*").from("productos");
    return resp;
  } catch (error) {
    console.log(error);
  }
}
//obtener producto por id
async function getById(id) {
  try {
    const resp = await knex.select("*").from("productos").where({ id });
    if (resp.length > 0) {
      return resp[0];
    } else {
      return (`No existe el producto con id: ${id}`);
    }
  } catch (error) {
    console.log(error);
  }
}
//agregar un nuevo producto
async function save(product) {
  try {
    const pd = {
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
    const resp = await knex("productos").insert(pd);
    return resp;
  } catch (error) {
    console.log(error);
  }
}
//actualizar un producto por id
async function update(product, _id) {
  try {
    const pd = {
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    };
    const resp = await knex("productos").where({ id: _id }).update(pd);
    return resp;
  } catch (error) {
    console.log(error);
  }
}
//eliminar un producto por id
async function deleteById(id) {
  try {
    const resp = await knex("productos").where({ id }).del();
    return resp;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAll, getById, save, update, deleteById };
