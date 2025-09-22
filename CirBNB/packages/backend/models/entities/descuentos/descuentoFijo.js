export default class DescuentoFijo {
  constructor(valorFijo) {
    if (valorFijo < 0) {
      throw new Error("El valor no puede ser negativo");
    }

    this.valorFijo = valorFijo;
  }

  valorDescontado(precioBase, cantidad) {
    return this.valorFijo;
  }
}
