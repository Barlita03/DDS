import dotenv from "dotenv";
import express from "express";
import Server from "./server.js";

import routes from "./routes/routes.js";

// Importo los controllers
import AlojamientoController from "./controllers/alojamientoController.js";
import HealthController from "./controllers/healthController.js";
import ReservaController from "./controllers/reservaController.js";

// Importo los service
import AlojamientoService from "./services/alojamientoService.js";
import ReservaService from "./services/reservaService.js";

// Importo los repository
import AlojamientoRepository from "./models/repositories/alojamientoRepository.js";

const app = express();
app.use(express.json());

// Configuramos el puerto con el .env
const port = process.env.PORT || 3000;
dotenv.config();

// Se envia el server al puerto
const server = new Server(app, port);

// Creo las capas de health
const healthController = new HealthController();

// Creo las capas de alojamiento
const alojamientoRepository = new AlojamientoRepository();
const alojamientoService = new AlojamientoService(alojamientoRepository);
const alojamientoController = new AlojamientoController(alojamientoService);

// Creo las capas de reserva
const reservaService = new ReservaService(alojamientoRepository);
const reservaController = new ReservaController(reservaService);

// Agrego los controllers
server.setController(AlojamientoController, alojamientoController);
server.setController(HealthController, healthController);
server.setController(ReservaController, reservaController);

routes.forEach((route) => server.addRoute(route));
server.configureRoutes();
server.launch();
