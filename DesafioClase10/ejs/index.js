const express = require("express");
const Contenedor = require("./src/Contenedor");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/* ------------------- establecemos el motor de plantilla ------------------- */
app.set("view engine", "ejs");
/* ----------- indicamos el dir donde se encuentran las plantillas ---------- */
app.set("views", "./src/views");

/* ------------------------ instacnio obj de la clase ----------------------- */
const productos = new Contenedor("./src/productos.txt");

app.use(express.static("public"));
/* ----------------------------endpoint para las rutas --------------------------------- */
// 1) /api/producctos -> devuelve lista de productos
app.get("/api/productos", async (req, res) => {
  const pd = await productos.getAll();
  res.render("lista.ejs", { productos: pd, existe: pd.length });
});

// 3) POST '/api/productos' -> recibe y agrega un producto

app.post("/api/productos", async (req, res) => {
  const product = req.body;
  /* ----------------- agrego nuevo producto ----------------- */
  const id = await productos.save(product);
  res.redirect("/");
});

const server = app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
server.on("error", (error) => console.log("error en el servidor: " + error));
