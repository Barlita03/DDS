import Alojamiento from "../models/entities/alojamientos/alojamiento.js";

export default class AlojamientoService {
  constructor(alojamientoRepository) {
    this.alojamientoRepository = alojamientoRepository;
  }

  findAll(page = 1, limit = 10, filtros = {}) {
    const numeroPagina = Math.max(Number(page), 1);
    const elementosPorPagina = Math.min(Math.max(Number(limit), 1), 100);

    const alojamientos = this.alojamientoRepository.findByPage(
      numeroPagina,
      elementosPorPagina,
      filtros
    );

    const total = this.alojamientoRepository.countAll();
    const totalPaginas = Math.ceil(total / elementosPorPagina);

    return {
      page: numeroPagina,
      limit: elementosPorPagina,
      total,
      totalPaginas,
      data: alojamientos,
    };
  }

  create(nuevoAlojamientoJSON) {
    const nuevoAlojamiento = new Alojamiento(
      nuevoAlojamientoJSON.nombre,
      nuevoAlojamientoJSON.precioPorNoche,
      nuevoAlojamientoJSON.categoria,
      nuevoAlojamientoJSON.caracteristicas || []
    );

    const alojamientoGuardado =
      this.alojamientoRepository.save(nuevoAlojamiento);

    return alojamientoGuardado;
  }

  findById(id) {
    const alojamiento = this.alojamientoRepository.findById(id);

    if (!alojamiento) {
      throw new Error("Alojamiento no encontrado");
    }

    return alojamiento;
  }

  delete(id) {
    const alojamiento = this.alojamientoRepository.findById(id);

    if (!alojamiento) {
      throw new Error("Alojamiento no encontrado");
    }

    return alojamiento;
  }

  update(id, alojamientoActualizadoJSON) {}
}
