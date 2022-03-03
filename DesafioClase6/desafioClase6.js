const Contenedor = require("./Contenedor");

const express = require("express");

const app = express();

let PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`servidor activo escuchando http://localhost:${PORT}`);
});

const pd = new Contenedor("productos.txt");

app.get("/productos", async (req, res) => {
  const datos = await pd.getAll();
  res.send(datos);
});

app.get("/productosRamdon", async (req, res) => {
  const datos = await pd.getAll();
  let _num = Math.floor(Math.random() * datos.length + 1);
  const _dato = await pd.getById(_num);
  res.send(_dato);
});
//buscar por id (peticion GET con identificador)
app.get("/productos/:id", async (req, res) => {
  try {
    const num = parseInt(req.params.id);
    const dato = await pd.getById(num);
    if (dato) {
      res.send(dato);
    } else {
      return error;
    }
  } catch (error) {
    res.send(error);
  }
});
