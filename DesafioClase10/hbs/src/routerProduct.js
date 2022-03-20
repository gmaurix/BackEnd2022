const express = require("express");
const { Router } = express;
const routerProduct = Router();
/* --------- importo clase Contenedor la reutilizare para el desafio -------- */
const Contenedor = require("./Contenedor");

/* ------------------------ instacnio obj de la clase ----------------------- */
const productos = new Contenedor("./src/productos.txt");

/* ----------------------------endpoint para las rutas --------------------------------- */
// 1) /api/prodtuctos -> devuelve lista de productos
routerProduct.get("/", async (req, res) => {
  const pd = await productos.getAll();
  res.render("index.hbs");
});

// 3) POST '/api/productos' -> recibe y agrega un producto

routerProduct.post("/", async (req, res) => {
  const product = req.body;
  /* ----------------- agrego nuevo producto ----------------- */
  const id = await productos.save(product);
  res.redirect("./src/views/lista.hbs");
});

/*
 // 4)PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
routerProduct.put("/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const pdAnterior = await productos.getById(parseInt(id));
  const pdModificado = await productos.updateById(id, body);

  res.json({ pdAnterior, pdModificado });
});
 */
// 5)DELETE '/api/productos/:id' -> elimina un producto según su id

/* routerProduct.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const listado = await productos.getById(id);
    if (listado) {
      const eliminado = await productos.deleteById(id);
      const data = await productos.getAll();
      res.json({ Resultado: `Producto con id: ${id} eliminado.`, listado });
    } else {
      res.json({ error: `producto con id:${id} no encontrado` });
    }
  } catch (error) {
    return error.message();
  }
});
 */

module.exports = routerProduct;
