import { z } from "zod";

export default class ReservaController {
  constructor(reservaService) {
    this.reservaService = reservaService;
  }

  create(req, res) {
    const body = req.body;
    const resultBody = reservaSchema.safeParse(body);

    if (resultBody.error) {
      res.status(400).json(resultBody.error.issues);
      return;
    }

    const nuevaReservaDTO = this.reservaService.create(resultBody.data);
    res.status(201).json({
      alojamiento: nuevaReservaDTO.alojamiento.nombre,
      diaInicio: nuevaReservaDTO.diaInicio,
      diaFin: nuevaReservaDTO.diaFin,
    });
  }
}

const reservaSchema = z.object({
  alojamiento: z.string(),
  diaInicio: z.preprocess((arg) => new Date(arg), z.date()),
  diaFin: z.preprocess((arg) => new Date(arg), z.date()),
});
