import { z } from "zod";

export default class AlojamientoController {
  constructor(alojamientoService) {
    this.alojamientoService = alojamientoService;
  }

  findAll(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const filtros = req.query;

    const alojamientosPaginados = this.alojamientoService.findAll(
      page,
      limit,
      filtros
    );

    if (alojamientosPaginados === null) {
      res.status(204).send("No se encontraron alojamientos");
      return;
    }

    // Evitar referencias circulares: mapear a DTO plano (copilot)
    const alojamientosDTO = alojamientosPaginados.data.map((a) => ({
      nombre: a.nombre,
      precioPorNoche: a.precioPorNoche,
      categoria: a.categoria,
      caracteristicas: a.caracteristicas,
      reservas: a.reservas.map((r) => ({
        diaInicio: r.diaInicio,
        diaFin: r.diaFin,
      })),
    }));

    res.status(200).json({
      ...alojamientosPaginados,
      data: alojamientosDTO,
    });
  }

  create(req, res) {
    const body = req.body;
    const resultBody = alojamientoSchema.safeParse(body);

    if (resultBody.error) {
      res.status(400).json(resultBody.error.issues);
      return;
    }

    const nuevoAlojamientoDTO = this.alojamientoService.create(resultBody.data);
    res.status(201).json(nuevoAlojamientoDTO);
  }

  // findById(req, res) {
  //   const resultId = idTransform.safeParse(req.params.id);

  //   if (resultId.error) {
  //     res.status(400).json(resultId.error.issues);
  //     return;
  //   }

  //   const id = resultId.data;
  //   const alojamiento = this.alojamientoService.findById(id);

  //   if (!alojamiento) {
  //     res.status(404).error("Alojamiento no encontrado");
  //     return;
  //   }

  //   res.status(200).json(alojamiento);
  // }

  // delete(req, res) {
  //   const resultId = idTransform.safeParse(req.params.id);

  //   if (resultId.error) {
  //     res.status(400).json(resultId.error.issues);
  //     return;
  //   }

  //   const id = resultId.data;
  //   const alojamientoEliminado = this.alojamientoService.delete(id);

  //   if (!alojamientoEliminado) {
  //     res.status(404).error("Alojamiento no encontrado");
  //     return;
  //   }

  //   res.status(200).json(alojamientoEliminado);
  // }

  // update(req, res) {
  //   const resultId = idTransform.safeParse(req.params.id);

  //   if (resultId.error) {
  //     res.status(400).json(resultId.error.issues);
  //     return;
  //   }

  //   const id = resultId.data;

  //   const body = req.body;
  //   const resultBody = alojamientoSchema.safeParse(body);

  //   if (resultBody.error) {
  //     res.status(400).json(resultBody.error.issues);
  //     return;
  //   }

  //   const alojamientoActualizadoDTO = resultBody.data;
  //   const alojamientoActualizado = this.alojamientoService.update(
  //     id,
  //     alojamientoActualizadoDTO
  //   );

  //   res.status(200).json(alojamientoActualizado);
  // }
}

const alojamientoSchema = z.object({
  nombre: z.string().min(3).max(20),
  categoria: z.string(),
  precioPorNoche: z.number().min(1),
  caracteristicas: z.array(z.string()).optional(),
});
