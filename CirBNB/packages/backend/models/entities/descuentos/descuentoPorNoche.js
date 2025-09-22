export default class DescuentoPorNoches {
  constructor(cantidadMinima, porcentaje) {
    this.cantidadMinima = cantidadMinima;
    this.porcentaje = porcentaje;
  }

  valorDescontado(precioBase, cantidad) {
    const vecesRepetido = Math.floor(cantidad / this.cantidadMinima);
    let valorDescontado = 0;

    if (vecesRepetido > 0) {
      valorDescontado = (this.porcentaje / 100) * precioBase * vecesRepetido;
    }

    return valorDescontado;
  }
}
