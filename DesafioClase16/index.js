const express = require("express");
const path = require("path");
const routerProductos = require("./src/routers/routerProductos");
const routerMensajes = require("./src/routers/routerMensajes");
const productos = require("./src/models/productosModels");
const msj = require("./src/models/mensajesModels");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOserver } = require("socket.io");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOserver(httpServer);
const PORT = 8080;

/* --------------- middleware para json -------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------- url base -------------------------------- */
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    defaultView: "index.hbs",
  })
);
app.use("/api/productos", routerProductos);
app.use("/api/mensajes", routerMensajes);
app.use(express.static(path.join(__dirname, "public")));
/* ------------------- establecemos el motor de plantilla ------------------- */
app.set("view engine", "hbs");
/* ----------- indicamos el dir donde se encuentran las plantillas ---------- */
app.set("views", "./src/views");

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  const listaProductos = await productos.getAll();

  /* ----------------------------- nuevo producto ----------------------------- */
  socket.emit("ListaProductos", listaProductos);

  socket.on("nuevoProducto", async (product) => {
    await productos.save(product);
    listaProductos.push(product);
    io.sockets.emit("listaProductos", listaProductos);
  });
  io.sockets.emit("listaProductos", listaProductos);
  /* ---------------------------- socket de menajes --------------------------- */

  const allMessages = await msj.getMessages();
  socket.emit("messages", allMessages);

  socket.on("mensaje", async (data) => {
    //guardo historial de msjs
    await msj.addMessage(data);

    // obtengo todos los mensajes;
    const msjs = await msj.getMessages();

    /* ----- io.socket.emit envia a todos los clientes conectados en el chat los msjs ---- */
    io.sockets.emit("messages", msjs);
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
server.on("error", (error) => console.log("error en el servidor: " + error));
