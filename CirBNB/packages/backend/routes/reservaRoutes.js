import reservaErrorHandler from "../middlewares/reservaMiddleware.js";
import ReservaController from "../controllers/reservaController.js";
import loggerMiddleware from "../middlewares/loggerMiddleware.js";
import express from "express";

const pathReservas = "/reserva";

export default function reservaRoutes(getController) {
  const router = express.Router();

  router.use(loggerMiddleware);

  router.post(pathReservas, (req, res) => {
    getController(ReservaController).create(req, res);
  });

  router.use(reservaErrorHandler);

  return router;
}
