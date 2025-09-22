import ReservaController from "../controllers/reservaController.js";
import express from "express";

const pathReservas = "/reserva";

export default function reservaRoutes(getController) {
  const router = express.Router();

  router.post(pathReservas, (req, res) => {
    getController(ReservaController).create(req, res);
  });

  return router;
}
