export default class InvalidReservation extends Error {
  constructor(id) {
    super();
    this.message = "No se puede realizar la reserva en la fecha solicitada.";
  }
}