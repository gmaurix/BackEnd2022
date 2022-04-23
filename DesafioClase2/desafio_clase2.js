class Usuario {
  constructor(nombre, apellido, libros = {}, mascotas = []) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.libros = libros),
      (this.mascotas = mascotas);
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascotas(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    let c = this.mascotas.length;
    return c;
  }
  addBooks(libro) {
    this.libros.push(libro);
  }

  getBookNames() {
    let titulo = [];
    for (let i = 0; i < this.libros.length; i++) {
      titulo.push(this.libros[i].nameBook);
    }
    return titulo;
  }
  getMascotas() {
    return this.mascotas;
  }
}

const user = new Usuario(
  "Felipe",
  "Lorenzo",
  [
    { nameBook: "Homo Deus", autor: "Yuval Harari" },
    { nameBook: "Rayuela", autor: "Julio Cortazar" },
  ],
  ["Perro", "Gato"]
);
// Punto 4
// getFullName
console.log(user.getFullName());
//addMascotas
user.addMascotas("Conejo");
//countMascotas
console.log(user.countMascotas());
//addBooks
user.addBooks({ nameBook: "El Aleph", autor: "Jorge Luis Borges" });
console.log(user.getBookNames());
