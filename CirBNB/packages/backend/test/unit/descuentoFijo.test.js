import { DescuentoFijo } from "../../src/DescuentoFijo.js";
import { jest } from "@jest/globals";

decribe("Descuento fijo valroesDescontados", () => {
  test("Devuelve el valor fijo pasado por constructor", () => {
    const d = new DescuentoFijo(100); // Preparacion
    const valor = d.valorDescontado(0, 0); // Ejecucion
    expect(valor).toBe(100); // Resultado
  });

  test("No se deben poder instanciar descuentos con valor negativo", () => {
    expect(() => new DescuentoFijo(-1).toThrow());
  });

  test("Se deben poder instanciar descuentos con valor 0", () => {
    expect(() => new DescuentoFijo(0).notToThrow());
  });
});
