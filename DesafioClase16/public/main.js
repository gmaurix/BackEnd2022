const socket = io.connect();

/* ---------------------------- agregar productos --------------------------- */
const formulario = document.getElementById("frmProduct");
/* const tabla = document.getElementById("tabla"); */
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); //evito recargar la pagina
  
  //creo el objeto producto con los datos provenientes del form
  const producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("nuevoProducto", producto); //envio el socket al server con el producto
  
  //reseteo el formulario
  formulario.reset();
});

/* ---------------------------- listar productos ---------------------------- */
socket.on("listaProductos", listar);

async function listar(listaProductos) {
  //obtengo la plantilla de hbs
  const obtnerTempLista = await fetch("./lista.hbs");

  //Del response del server, extraigo texto
  const datosLista = await obtnerTempLista.text();

  //armo template
  const crearTemplate = Handlebars.compile(datosLista);
  if (listaProductos) {
    const html = crearTemplate({ listaProductos });

    //agrego la tabla al index.html
    document.getElementById("listado").innerHTML = html;
    console.log("html");
  } else {
    console.log(html);
  }
}

/* ---------------------------------- chat ---------------------------------- */

const frmChat = document.getElementById("form");

let mail = document.getElementById("username");
let texto = document.getElementById("texto");
let boton = document.getElementById("btn_chat");

boton.disabled = true;
texto.disabled = true;
/* function para evitar validar ingreso de mail */
mail.addEventListener("keyup", () => {
  if (mail.value.trim() !== "" || mail.value == null) {
    boton.removeAttribute("disabled");
    texto.removeAttribute("disabled");
  } else {
    boton.setAttribute("disabled", "true");
    texto.setAttribute("disabled", "true");
    mail.value = null;
    frmChat.reset();
  }
});

frmChat.addEventListener("submit", (e) => {
  e.preventDefault();
  //agrego fecha/hora
  const fyh = new Date().toLocaleString();

  const msj = {
    autor: document.getElementById("username").value,
    mensaje: document.getElementById("texto").value,
    fyh: fyh,
  };

  socket.emit("mensaje", msj);
  frmChat.reset();
});

async function render(data) {
  const html = await data
    .map((x) => {
      return `<div>
               <strong style='color:blue;'>${x.autor} - </strong>  <strong style='color:brown;'> ${x.fyh}: </strong> <em style='color:#087732;'>${x.mensaje}</em> 
              </div>`;
    })
    .join(" ");

  document.getElementById("mensajes").innerHTML = html;
}

socket.on("messages", function (data) {
  render(data);
});
