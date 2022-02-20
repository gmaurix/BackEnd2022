const fs = require("fs");

//const ruta = "/DesafioClase4/archivo.text";

const objProducto1 = {
  title: "Escuadras",
  price: 123.5,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
const objProducto2 = {
  title: "Calculadora",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
const objProducto3 = {
  title: "Globo T.",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};
const objProducto4 = {
  title: "Lapicera",
  price: 123.45,
  thumbnail:
    "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.datos = [];
    this.id = 0;
  }
  async save(producto) {
    await this.getAll();
    this.id++;
    this.datos.push({ ...producto, id: this.id });
    try {
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.datos, null, 2)
      );
    } catch (error) {
      console.log("No se pudo guardar el producto" + error);
    }
  }

  async getById(id) {
    await this.getAll();
    try {
      if (this.datos.find((prod) => prod.id === id)) {
        const pd = this.datos.find((prod) => prod.id === id);
        console.log("Producto encontrado");
        console.log(pd);
      } else {
        console.log(`No se encuentra el pd con id: ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      if (data) {
        this.datos = JSON.parse(data);
        this.datos.map((producto) => {
          if (this.id < producto.id) this.id = producto.id;
        });
        // console.log(this.datos);
        return this.datos;
      }
    } catch (e) {
      console.log("hubo un error: " + e);
    }
  }

  deleteById(id) {}

  deleteAll() {}
}

const c = new Contenedor("archivo.text");

function guardarProducto() {
  c.save(objProducto1);
  c.save(objProducto2);
  c.save(objProducto3);
  c.save(objProducto4);
}

function ObtenerTodos() {
  c.getAll();
}
function ObtenerId(id) {
  c.getById(id);
}
ObtenerId(1);
//guardarProducto();
//ObtenerTodos();
