import {
  filtrarPorPrecio,
  filtrarPorCaracteristicas,
} from "../functions/funciones.js";
import fs from "node:fs/promises";
import path from "node:path";
import { map } from "zod";
// import Alojamiento from "../entities/alojamientos/alojamiento.js";

export default class AlojamientoRepository {
  static alojamientoPath = path.join("data", "alojamientos.json");

  async findAll(filtros = {}) {
    const { maxPrice, caracteristics } = filtros;

    const data = await fs.readFile(AlojamientoRepository.alojamientoPath);
    const dataObjects = await JSON.parse(data);

    let alojamientosADevolver = mapToAlojamientos(dataObjects);

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

  async findByPage(numeroPagina, elementosPorPagina, filtros) {
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

  async save(alojamiento) {
    const alojamientos = await this.findAll();
    alojamiento.id = alojamientos.length + 1;
    this.alojamientos.push(alojamiento);
    await fs.writeFile(
      AlojamientoRepository.alojamientoPath,
      JSON.stringify(this.alojamientos, null, 2)
    );

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

  async countAll() {
    const alojamientos = await this.findAll();
    return alojamientos.length;
  }

  addReservation(alojamiento, reserva) {
    alojamiento.reservas.push(reserva);
  }
}

// TODO: Terminar
function mapToAlojamientos(dataObject) {
  const { nombre, categoria, precioPorNoche } = dataObject;
}
