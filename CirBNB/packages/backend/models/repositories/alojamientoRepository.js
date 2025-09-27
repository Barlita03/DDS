import Alojamiento from "../entities/alojamientos/alojamiento.js";
import Reserva from "../entities/reserva.js";
import fs from "node:fs/promises";
import path from "node:path";

export default class AlojamientoRepository {
  static alojamientoPath = path.join("data", "alojamientos.json");

  async findByPage(numeroPagina, elementosXPagina, filtros) {
    const offset = (numeroPagina - 1) * elementosXPagina;
    const alojamientos = await this.buscarTodos(filtros);
    return alojamientos.slice(offset, offset + elementosXPagina);
  }

  async buscarPorNombre(nombre) {
    const alojamientos = await this.buscarTodos({});

    return alojamientos.find(
      (alojamiento) => alojamiento.nombre.toLowerCase() === nombre.toLowerCase()
    );
  }

  async buscarTodos(filtros) {
    const { maxPrice } = filtros;
    const data = await fs.readFile(AlojamientoRepository.alojamientoPath);

    const dataObjects = await JSON.parse(data);

    let alojamientosADevolver = mapToAlojamientos(dataObjects);

    if (maxPrice) {
      alojamientosADevolver = this.precioMenorQue(
        maxPrice,
        alojamientosADevolver
      );
    }

    return alojamientosADevolver;
  }

  async crear(alojamiento) {
    const alojamientos = await this.buscarTodos({});
    alojamiento.id = alojamientos.length + 1;
    alojamientos.push(alojamiento);
    await fs.writeFile(
      AlojamientoRepository.alojamientoPath,
      JSON.stringify(alojamientos)
    );
    return alojamiento;
  }

  async findById(id) {
    const alojamientos = await this.buscarTodos({});
    return alojamientos.filter((aloj) => aloj.id === id)[0];
  }

  async eliminar(id) {
    const alojamientos = await this.buscarTodos({});
    const indice = alojamientos.findIndex((aloj) => aloj.id === id);
    if (indice === -1) return null;
    const alojamiento = alojamientos[indice];
    alojamientos.splice(indice, 1);
    await fs.writeFile(
      AlojamientoRepository.alojamientoPath,
      JSON.stringify(alojamientos)
    );
    return alojamiento;
  }

  async actualizar(id, alojamientoModificado) {
    const alojamientos = await this.buscarTodos({});
    const indice = alojamientos.findIndex((a) => a.id === id);
    if (indice === -1) return null;
    const alojamientoActualizado = {
      ...alojamientos[indice],
      ...alojamientoModificado,
    };
    alojamientos[indice] = alojamientoActualizado;
    await fs.writeFile(
      AlojamientoRepository.alojamientoPath,
      JSON.stringify(alojamientos)
    );
    return alojamientoActualizado;
  }

  async agregarReserva(alojamiento, reserva) {
    const alojamientos = await this.buscarTodos({});

    const indice = alojamientos.findIndex((a) => a.id === alojamiento.id);

    if (indice === -1) {
      throw new Error("Alojamiento no encontrado para agregar reserva");
    }

    // Guardar solo los datos simples, sin referencias circulares
    alojamientos[indice].reservas.push({
      diaInicio:
        reserva.diaInicio instanceof Date
          ? reserva.diaInicio.toISOString()
          : reserva.diaInicio,
      diaFin:
        reserva.diaFin instanceof Date
          ? reserva.diaFin.toISOString()
          : reserva.diaFin,
      descuentos: reserva.descuentos || [],
    });

    await fs.writeFile(
      AlojamientoRepository.alojamientoPath,
      JSON.stringify(alojamientos)
    );
  }

  // AUX

  precioMenorQue(precio, alojamientos) {
    return alojamientos.filter((a) => a.precioPorNoche < precio);
  }

  alojamientoMasCaro() {
    const listaDePrecios = this.alojamientos.map((a) => {
      return a.precioPorNoche;
    });
    const precioMaximo = Math.max(...listaDePrecios);

    const alojamiento = this.alojamientos.find((a) => {
      return a.precioPorNoche == precioMaximo;
    });

    return alojamiento;
  }

  async contarTodos() {
    const alojamientos = await this.buscarTodos({});
    return alojamientos.length;
  }
}

function mapToAlojamiento(dataObject) {
  const { nombre, categoria, precioPorNoche, reservas = [] } = dataObject;
  const aloj = new Alojamiento(nombre, precioPorNoche, categoria);
  aloj.id = dataObject.id;
  // Mapear reservas a objetos planos (sin referencia a alojamiento)
  aloj.reservas = reservas.map((r) => {
    const diaInicio =
      r.diaInicio instanceof Date ? r.diaInicio : new Date(r.diaInicio);
    const diaFin = r.diaFin instanceof Date ? r.diaFin : new Date(r.diaFin);
    return {
      diaInicio,
      diaFin,
      descuentos: r.descuentos || [],
    };
  });
  return aloj;
}

function mapToAlojamientos(dataObjects) {
  return dataObjects.map(mapToAlojamiento);
}
