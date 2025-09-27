import Reserva from "../models/entities/reserva.js";

export default class ReservaService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

  async create(nuevaReservaJSON) {
    const alojamiento = await this.alojamientoRepository.buscarPorNombre(
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

    this.alojamientoRepository.agregarReserva(alojamiento, nuevaReserva);

    return nuevaReserva;
  }
}
