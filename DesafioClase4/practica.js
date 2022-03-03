const fs = require("fs");
const { async } = require("q");

async function crearArchivo() {
  try {
    await fs.promises.writeFile("./archivo.text", "Texto File \n");
    console.log("Archivo Creado");
  } catch (error) {
      
    console.log("Ups!");
  }
}
//crearArchivo();

async function addInfo() {
  try {
    await fs.promises.appendFile("./archivo.text", "Another Line \n");
    console.log("Archivo modificado");
  } catch (error) {
    console.log("Ups!");
  }
}
addInfo();

async function leerArchivo() {
  try {
    const info = await fs.promises.readFile("./archivo.text", "utf-8");
    console.log(info);
  } catch (error) {
    console.log("Ups al leer");
  }
}

leerArchivo();
