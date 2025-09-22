import AlojamientoDoesNotExist from "../errors/AlojamientoDoesNotExist.js";
import InvalidCategoria from "../errors/InvalidCategoria.js";

export default function alojamientosErrorHandler(err, _req, res, _next) {
  console.log(err.message);

  if (err.constructor.name == AlojamientoDoesNotExist.name) {
    res.status(404).json({ id: err.id, message: err.message });
    return;
  }

  if (err.constructor.name == InvalidCategoria.name) {
    res.status(400).json({ message: err.message });
    return;
  }

  res.status(500).json({ error: "Ups. Algo sucedio en el servidor." });
}
