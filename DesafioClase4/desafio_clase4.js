const fs = require("fs");
const { async } = require("q");
const ruta = "./archivo.text";

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.datos = [];
    this.id = 0;
  }
  save() {}

  getById() {}

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      /* if (data) {
        this.datos = JSON.parse(data,null,2);
        this.datos.map((p) => {
          if (this.id < p.id) this.id = x.id;
        }); */
      console.log(data);
      //}
    } catch (error) {
      console.log("Oocurrio un error " + error);
    }
  }

  deleteById(id) {}

  deleteAll() {}
}

const c = new Contenedor("archivo.text");

function ObtenerTodos() {
  c.getAll();
}
console.log("todos");
ObtenerTodos();
