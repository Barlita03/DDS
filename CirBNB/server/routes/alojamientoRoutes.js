import AlojamientoController from "../controllers/alojamientoController.js";
import express from "express";

const pathAlojamientos = "/alojamiento";

export default function alojamientoRoutes(getController) {
  const router = express.Router();

  router.get(pathAlojamientos, (req, res) => {
    getController(AlojamientoController).findAll(req, res);
  });

  router.post(pathAlojamientos, (req, res) => {
    getController(AlojamientoController).create(req, res);
  });

  router.get(pathAlojamientos + "/:id", (req, res) => {
    getController(AlojamientoController).findById(req, res);
  });

  router.delete(pathAlojamientos + "/:id", (req, res) => {
    getController(AlojamientoController).delete(req, res);
  });

  router.put(pathAlojamientos + "/:id", (req, res) => {
    getController(AlojamientoController).update(req, res);
  });

  return router;
}
