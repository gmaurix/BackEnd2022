const fs = require("fs");

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

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.datos = [];
    this.id = 0;
  }
  async save(producto) {
    /* ----------------------------- leo el archivo ----------------------------- */
    await this.getAll();
    this.id++;
    /* ------------------------ agrego el Object al array ----------------------- */
    this.datos.push({ ...producto, id: this.id });
    try {
      /* ------------------ guardo el nuevo Object en el archivo ----------------- */
      /* -------- podria haber usado un appendFile, pero bueno lo deje asi -------- */
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.datos, null, 2)
      );
    } catch (error) {
      console.log("No se pudo guardar el producto" + error);
    }
  }

  async getById(id) {
    /* ------------------------------- traigo todo ------------------------------ */
    await this.getAll();
    try {
      if (this.datos) {
        /* ------- Hago la busqueda del dato q coincida con el id pasado por param ------ */
        const pd = this.datos.find((prod) => prod.id === id);
        /* -------------------------- si se cumple muestro -------------------------- */
        console.log("Producto encontrado:\n ");
        console.log(pd);
      } else {
        console.log(`No se encuentra el producto con id: ${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      /* ----------------------------- leo el archivo ----------------------------- */
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      if (data) {
        /* ----------- si data tiene info parseo y hago un map de la info ----------- */
        /* -- ese mismo map me sirve luego para agregar nuevo Objeto sin pisar la info q ya tengo xq uso WriteFile en lugar de append... -- */
        this.datos = JSON.parse(data);
        this.datos.map((producto) => {
          if (this.id < producto.id) this.id = producto.id;
        });
        return this.datos;
      }
    } catch (e) {
      console.log("error: " + e);
    }
  }

  async deleteById(id) {
    /* ------------------------------ Traigo todos ------------------------------ */
    await this.getAll();
    try {
      /* ------------------ filtro todos aquellos q no coincidan ------------------ */
      const data = this.datos.filter((producto) => producto.id !== id);
      /* -------- pregunto si se cumple el filtrado, es decir si hay datos -------- */
      if (data) {
        /* -------------- entonces escribo en el archivo el nuevo array ------------- */
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify(data, null, 2)
        );
        /* ---------------------------- muestro x consola --------------------------- */
        console.log(data);
      }
    } catch (error) {
      console.log("Error al eliminar; " + error);
    }
  }

  async deleteAll() {
    try {
      /* ---------------------Acá elimino el archivo directamente -------------------- */
      await fs.promises.unlink(this.archivo);
      console.log("Archivo eliminado");
    } catch (error) {
      console.log("Error al elimanr el archivo " + error);
    }
  }
}

const c = new Contenedor("Producto.txt");

function guardarProducto() {
  c.save(objProducto1);
  c.save(objProducto2);
  c.save(objProducto3);
}

function ObtenerId(id) {
  c.getById(id);
}

async function ObtenerTodos() {
  console.log(await c.getAll());
}

function BorrarId(id) {
  c.deleteById(id);
}
function BorrarTodo() {
  c.deleteAll();
}

//guardarProducto();

ObtenerId(1);
//ObtenerTodos();
//BorrarId(2);
//BorrarTodo();
