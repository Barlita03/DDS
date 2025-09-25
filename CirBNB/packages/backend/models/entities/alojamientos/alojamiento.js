export default class Alojamiento {
  constructor(nombre, precioPorNoche, categoria) {
    this.nombre = nombre;
    this.precioPorNoche = precioPorNoche;
    this.categoria = categoria;
    this.caracteristicas = [];
    this.reservas = [];
  }

  agregarReserva(reserva) {
    this.reservas.push(reserva);
  }

  agregarCaracteristica(caracteristica) {
    if (!this.caracteristicas.includes(caracteristica)) {
      this.caracteristicas.push(caracteristica);
    }
  }

  estaReservado(fechaInicio, fechaFin) {
    return this.reservas.some(
      (reserva) => fechaInicio < reserva.diaFin && fechaFin > reserva.diaInicio
    );
  }

  getDescripcion() {
    return `${this.nombre} (${this.categoria}) - $${this.precioPorNoche}`;
  }
}
