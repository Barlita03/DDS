import { z } from "zod";

export default class ReservaController {
  constructor(reservaService) {
    this.reservaService = reservaService;
  }

  async create(req, res) {
    const body = req.body;
    const resultBody = reservaSchema.safeParse(body);

    if (resultBody.error) {
      res.status(400).json(resultBody.error.issues);
      return;
    }

    try {
      const nuevaReservaDTO = await this.reservaService.create(resultBody.data);
      res.status(201).json({
        alojamiento: nuevaReservaDTO.alojamiento.nombre,
        diaInicio: nuevaReservaDTO.diaInicio,
        diaFin: nuevaReservaDTO.diaFin,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const reservaSchema = z.object({
  alojamiento: z.string(),
  diaInicio: z.preprocess((arg) => new Date(arg), z.date()),
  diaFin: z.preprocess((arg) => new Date(arg), z.date()),
});
