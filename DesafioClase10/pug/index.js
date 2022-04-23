const express = require("express");

/* ----------------------------- importo el router ----------------------------- */
/* const router=express.Router() */
const routerProduct = require("./src/routerProduct");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("addProductos");
});
app.get("/listar", (req, res) => {
  res.render("listarProductos");
});
/* -------------------------------- url base -------------------------------- */
app.use("/static", express.static("public"));
app.use("/api/productos", routerProduct);

const server = app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
server.on("error", (error) => console.log("error en el servidor: " + error));
