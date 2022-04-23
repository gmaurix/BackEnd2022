const knex = require("../../db_sqlite_config");


/*-------------------- obtengo los mensajes ------------------------------- */
async function getMessages() {
  try {
    const resp = await knex.select("*").from("mensajes");    
    return resp;
  } catch (error) {
    console.log(error);
  }
}

/* ---------------------------- guardo los chats ---------------------------- */
async function addMessage(mensaje) {
  try {
    const msj = {
      autor: mensaje.autor,
      mensaje: mensaje.mensaje,
      fyh: mensaje.fyh,
    };
    const resp = await knex("mensajes").insert(msj);
    return resp;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getMessages, addMessage };
