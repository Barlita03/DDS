export default class DescuentoFijo {
  constructor(valorFijo) {
    this.valorFijo = valorFijo;
  }

  valorDescontado(precioBase, cantidad) {
    return this.valorFijo;
  }
}
