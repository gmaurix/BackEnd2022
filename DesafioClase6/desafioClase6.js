const Contenedor = require("./Contenedor");

const express = require("express");

const app = express();

let PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor activo escuchando http://localhost:${PORT}/`);
});

//A get '/productos'
const pd = new Contenedor("productos.txt");

app.get("/productos", async (req, res) => {
  const datos = await pd.getAll();
  res.send(datos);
});

//B get '/productoRandom'
app.get("/productosRamdon", async (req, res) => {
  const datos = await pd.getAll();
  let _num = Math.floor(Math.random() * datos.length + 1);
  const _dato = await pd.getById(_num);
  res.send(_dato);
});
