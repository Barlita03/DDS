import InvalidDate from "../errors/invalidDate.js";
import InvalidReservation from "../errors/InvalidReservation.js";

export default function reservaErrorHandler(err, _req, res, _next) {
  console.log(err.message);

  if (err.constructor.name == InvalidDate.name) {
    res.status(404).json({ id: err.id, message: err.message });
    return;
  }

  if (err.constructor.name == InvalidReservation.name) {
    res.status(404).json({ id: err.id, message: err.message });
    return;
  }

  res.status(500).json({ error: "Ups. Algo sucedio en el servidor." });
}