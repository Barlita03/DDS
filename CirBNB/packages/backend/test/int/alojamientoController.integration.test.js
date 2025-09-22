import { request } from "supertest";
import { buildTestServer } from "./utils/buildTestServer.js";
import { AlojamientoService } from "../../src/services/alojamientoService.js";
import { AlojamientoController } from "../../src/controllers/alojamientoController.js";
import { AlojamientoRoutes } from "../../src/routes/alojamientoRoutes.js";
import { jest } from "@jest/globals";

const mockRepo = {
  findByPage: jest.fn(),
  contarTodos: jest.fn(),
};

const alojamientoService = new AlojamientoService(mockRepo);
const alojamientoController = new AlojamientoController(alojamientoService);

const server = buildTestServer();
server.addRoute(alojamientoRoutes);
server.setController(AlojamientoController, alojamientoController);
server.configureRoutes();

describe("GET /alojamientos", async () => {
  test("casoExitoso", () => {
    const sampleData = [
      new Alojamiento("Hotel1", 100, Categoria.HOTEL),
      new Alojamiento("Hotel2", 100, Categoria.HOTEL),
      new Alojamiento("Hotel3", 100, Categoria.HOTEL),
    ];

    mockRepo.findByPage.mockResolvedValue(sampleData);
    mockRepo.contarTodos.mockResolvedValue(500);

    //! const res = await request(server.app).get("/alojamientos?page=1&limit=3");

    // TODO: Faltan agregar algunos
    expect(res.status).toBe(200);
    expect(res.body.pagina).toBe(1);
    expect(res.body.perPage).toBe(3);
    expect(res.body.total).toBe(500);
    expect(res.body.totalPaginas).toBe(Math.ceil(500 / 3));
    expect(res.body.data).toHaveLenght(3);
  });
});

describe("POST /alojamientos", async () => {});
