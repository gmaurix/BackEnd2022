const express = require("express");
const fs = require("fs");
const path = require("path");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOserver } = require("socket.io");
const Contenedor = require("./src/Contenedor");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOserver(httpServer);
const PORT = 3002;
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

app.use(express.static(path.join(__dirname, "public")));
/* ------------------- establecemos el motor de plantilla ------------------- */
app.set("view engine", "hbs");
/* ----------- indicamos el dir donde se encuentran las plantillas ---------- */
app.set("views", "./src/views");

/* ------------------------ instancio obj de la clase ----------------------- */
const productos = new Contenedor("./src/productos.txt");

/* ---------------- function para leer y guardar historial del chat ---------------- */
/* ------------------------------ leo los chats ----------------------------- */
async function getMessages() {
  const _dir = "./src/historial_msjs/historyMessages.txt";
  try {
    const data = await fs.promises.readFile(_dir, "utf8");
    const msjs = JSON.parse(data);
    msjs.map((x) => x == x);
    return msjs;
  } catch (error) {}
}
/* ---------------------------- guardo los chats ---------------------------- */
async function addMessage(data) {
  try {
    const leidos = await getMessages();
    leidos.push(data);
    const msj = await fs.promises.writeFile(
      "./src/historial_msjs/historyMessages.txt",
      JSON.stringify(leidos, null, 2)
    );
    return msj;
  } catch (error) {
    console.log("error");
  }
}

const messages = [];

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

  const allMessages = await getMessages();
  socket.emit("messages", allMessages);

  socket.on("mensaje", (data) => {
    //guardo historial de msjs
    addMessage(data);

    /* guardo en memoria para devolverlos
    juntos con los que tengo guardados en historial...txt.
    de esta manera se reflejara en el chat el ultimo mensaje
    en tiempo real, sin demora por el uso del await,
    ya que sin implementar; messages.push(...allMessages, data),
    solo se reflejaban recargando la pagina.*/
    messages.push(...allMessages, data);

    /* ----- io.socket.emit envia a todos los clientes conectados en el chat ---- */
    io.sockets.emit("messages", messages);
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
server.on("error", (error) => console.log("error en el servidor: " + error));
