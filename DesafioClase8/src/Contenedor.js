const fs = require("fs");

module.exports = class Contenedor {
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
      return this.id;
    } catch (error) {
      console.log("No se pudo guardar el producto" + error);
    }
  }

  async getById(id) {
    /* ------------------------------- traigo todo ------------------------------ */
    await this.getAll();
    try {
      /* ------- Hago la busqueda del dato q coincida con el id pasado por param ------ */
      const pd = this.datos.find((prod) => prod.id === id);
      if (pd) {
        /* -------------------------- si se cumple muestro -------------------------- */
        return pd;
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

  async updateById(id, pdActualizar) {
    let lista = await this.getAll();
    try {
      /* ---------------------- busco el indice del producto ---------------------- */
      const indice = this.datos.findIndex((x) => x.id == id);
      let prod = lista[indice];

      if (prod) {
        const { title, price, thumbnail } = pdActualizar;
        prod.title = title;
        prod.price = price;
        prod.thumbnail = thumbnail;

        /* ---------------- inserto producto actualizado en la lista ---------------- */
        lista[indice] = prod;

        try {
          /* -------------- actualizo el archivo con producto modificado -------------- */
          await fs.promises.writeFile(
            this.archivo,
            JSON.stringify(lista, null, 2)
          );
          return lista;
        } catch (error) {}

        return prod;
      } else {
        return { Error: `producto con id:${id} no encontrado` };
      }
    } catch (error) {}
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
        return data;
      }
    } catch (error) {
      console.log("Error al eliminar; " + error);
    }
  }

  async deleteAll() {
    try {
      /* ---------------------Acá elimino el archivo directamente -------------------- */
      await fs.promises.unlink(this.archivo);
      return "Archivo eliminado";
    } catch (error) {
      console.log("Error al elimanr el archivo " + error);
    }
  }
};

//const c = new Contenedor("Producto.txt");

function guardarProducto() {
  c.save(objProducto4);
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
