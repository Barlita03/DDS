import HealthController from "../controllers/healthController.js";
import express from "express";

export default function healthRoutes(getController) {
  const router = express.Router();

  router.get("/health", (req, res) => {
    getController(HealthController).health(req, res);
  });

  return router;
}
