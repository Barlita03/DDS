function Alojamiento(nombre, precioPorNoche, categoria) {
  this.nombre = nombre;
  this.precioPorNoche = precioPorNoche;
  this.categoria = categoria;
}

Alojamiento.prototype.getDescripcion = function () {
  return `${this.nombre} (${this.categoria}) - $${this.precioPorNoche}`;
};

const alojamiento1 = new Alojamiento("Hotel en Buenos Aires", 100, "Hotel");
console.log(alojamiento1.getDescripcion()); // "Hotel en Buenos Aires (Hotel) - $100"
