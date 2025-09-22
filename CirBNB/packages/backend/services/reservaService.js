import Reserva from "../models/entities/Reserva.js";

export default class ReservaService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

  create(nuevaReservaJSON) {
    const alojamiento = this.alojamientoRepository.findByName(
      nuevaReservaJSON.alojamiento
    );

    if (!alojamiento) {
      throw new Error("Alojamiento no encontrado");
    }

    const nuevaReserva = new Reserva(
      alojamiento,
      nuevaReservaJSON.diaInicio,
      nuevaReservaJSON.diaFin
    );

    this.alojamientoRepository.addReservation(alojamiento, nuevaReserva);

    return nuevaReserva;
  }
}
