import { AlojamientoService } from "../../src/services/alojamientoService.js";
import { jest } from "@jest/globals";

describe("AlojamientoService.buscarTodos", () => {
  const mockRepo = {
    findByPage: jest.fn(),
    contarTodos: jest.fn(),
  };

  const alojamientoService = new AlojamientoService(mockRepo);

  test("Estructura de paginacion default", () => {
    const sampleData = [
      new AlojamientoService("Hotel1", 100, Categoria.HOTEL),
      new AlojamientoService("Hotel2", 200, Categoria.HOTEL),
      new AlojamientoService("Hotel3", 300, Categoria.HOTEL),
    ];

    mockRepo.findByPage.mockReturnValue(sampleData);

    mockRepo.contarTodos.mockResolvedValue(10);

    const resultado = await alojamientoService.buscarTodos(2, 3);

    expect(mockRepo.findByPage).toHaveBeenCalledWith(2, 3, {});
    expect(mockRepo.findByPage).toHaveBeenCalled();

    expect(resultado).toEqual({
      pagina: 2,
      perPage: 3,
      total: 10,
      totalPaginas: Math.ceil(10 / 3),
      data: sanokeData,
    });
  });
});
