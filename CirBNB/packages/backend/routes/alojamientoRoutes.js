import { ca } from "zod/locales";
import AlojamientoController from "../controllers/alojamientoController.js";
import express from "express";

const pathAlojamientos = "/alojamiento";

export default function alojamientoRoutes(getController) {
  const router = express.Router();

  router.get(pathAlojamientos, async (req, res) => {
    try {
      await getController(AlojamientoController).findAll(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
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
