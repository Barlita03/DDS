import {
  filtrarPorPrecio,
  filtrarPorCaracteristicas,
} from "../functions/funciones.js";

export default class AlojamientoRepository {
  constructor() {
    this.alojamientos = [];
    this.nextId = 1;
  }

  findAll(filtros = {}) {
    const { maxPrice, caracteristics } = filtros;
    let alojamientosADevolver = this.alojamientos;

    if (maxPrice) {
      alojamientosADevolver = filtrarPorPrecio(alojamientosADevolver, maxPrice);
    }

    if (caracteristics) {
      const applyCaracteristics = caracteristics.split(",");

      alojamientosADevolver = filtrarPorCaracteristicas(
        alojamientosADevolver,
        applyCaracteristics
      );
    }

    return alojamientosADevolver;
  }

  findByPage(numeroPagina, elementosPorPagina, filtros) {
    const offset = (numeroPagina - 1) * elementosPorPagina;
    const alojamientos = this.findAll(filtros);

    return alojamientos.slice(offset, offset + elementosPorPagina);
  }

  findByName(nombreAlojamiento) {
    const alojamiento = this.alojamientos.find(
      (a) => a.nombre === nombreAlojamiento
    );

    if (!alojamiento) {
      return null;
    }

    return alojamiento;
  }

  save(alojamiento) {
    alojamiento.id = this.nextId++;
    this.alojamientos.push(alojamiento);

    return alojamiento;
  }

  findById(id) {
    return this.alojamientos.find((a) => a.id === id);
  }

  delete(id) {
    const index = this.alojamientos.findIndex((a) => a.id === id);

    if (index === -1) {
      return null;
    }

    const [deletedAlojamiento] = this.alojamientos.splice(index, 1);
    return deletedAlojamiento;
  }

  update(id, alojamientoModificado) {
    const index = this.alojamientos.findIndex((a) => a.id === id);

    if (index === -1) {
      return null;
    }

    const alojamientoActualizado = {
      ...this.alojamientos[index],
      ...alojamientoModificado,
    };

    this.alojamientos[index] = alojamientoActualizado;

    return alojamientoActualizado;
  }

  countAll() {
    return this.alojamientos.length;
  }

  addReservation(alojamiento, reserva) {
    alojamiento.reservas.push(reserva);
  }
}
