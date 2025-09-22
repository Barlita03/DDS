export default class DescuentoPorcentaje {
  constructor(porcentaje) {
    this.porcentaje = porcentaje;
  }

  valorDescontado(precioBase, cantidad) {
    return (this.porcentaje / 100) * precioBase;
  }
}
