export default class Reserva {
  constructor(alojamiento, diaInicio, diaFin) {
    this.verificarFecha(diaInicio);
    this.verificarFecha(diaFin);
    this.verificarEstaReservado(alojamiento, diaInicio, diaFin);

    this.alojamiento = alojamiento;
    this.diaInicio = diaInicio;
    this.diaFin = diaFin;
    this.descuentos = [];
  }

  verificarEstaReservado(alojamiento, diaInicio, diaFin) {
    if (alojamiento.estaReservado(diaInicio, diaFin)) {
      throw new Error(
        "El alojamiento se encuentra reservado en la fecha seleccionada"
      );
    }
  }

  verificarFecha(fecha) {
    if (!(fecha instanceof Date)) {
      throw new Error("diaInicio y diaFin deben ser una instancia de Date");
    }
  }

  cantidadDeNoches() {
    const msPorDia = 24 * 60 * 60 * 1000;
    return Math.ceil((this.diaFin - this.diaInicio) / msPorDia);
  }

  precioBase() {
    return this.cantidadDeNoches() * this.alojamiento.precioPorNoche;
  }

  precioFinal() {
    let precioBase = this.precioBase();
    let totalDescontado = 0;

    for (const descuento of this.descuentos) {
      totalDescontado += descuento.valorDescontado(
        precioBase,
        this.cantidadDeNoches()
      );
    }

    return Math.max(0, precioBase - totalDescontado);
  }

  agregarDescuento(descuento) {
    this.descuentos.push(descuento);
  }

  sacarDescuento(descuento) {
    const index = this.descuentos.indexOf(descuento);
    if (index > -1) {
      this.descuentos.splice(index, 1);
    }
  }
}
