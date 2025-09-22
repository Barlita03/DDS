import { Alojamiento } from "../../src/dominio/alojamiento.js";
import { Reserva } from "../../src/dominio/reserva.js";
import { Categoria } from "../../src/dominio/categoria.js";
import { jest } from "@jest/globals";

describe("Alojamiento.tieneConflictoConFechas", () => {
  const alojamientoBase = () => {
    return new Alojamiento("Hotal", 100, Categoria.HOTEL);
  };

  test("Sin reservas retorna false", () => {
    const a = alojamientoBase();
    expect(
      a.tieneConflictoConFechas(new Date(2025, 9, 22), new Date(2025, 9, 30))
    ).toBe(false);
  });

  test("Reserva previa, no hay conflicto", () => {
    const a = alojamientoBase();
    const r = new Reserva(a, new Date(2025, 9, 22), new Date(2025, 9, 30));

    a.agregarReserva(r);

    expect(
      a.tieneConflictoConFechas(new Date(2025, 10, 22), new Date(2025, 10, 30))
    ).toBe(false);
  });

  test("Fecha de inicio de la nueva reserva es previa a fecha de fin de una reserva previa", () => {
    const a = alojamientoBase();
    const r = new Reserva(a, new Date(2025, 9, 22), new Date(2025, 9, 30));

    a.agregarReserva(r);

    expect(
      a.tieneConflictoConFechas(new Date(2025, 9, 25), new Date(2025, 10, 3))
    ).toBe(true);
  });

  test("Fecha de fin de la nueva reserva es previa a fecha de fin de una reserva previa", () => {
    const a = alojamientoBase();
    const r = new Reserva(a, new Date(2025, 9, 22), new Date(2025, 9, 30));

    a.agregarReserva(r);

    expect(
      a.tieneConflictoConFechas(new Date(2025, 9, 20), new Date(2025, 9, 27))
    ).toBe(true);
  });

  test("Fecha de nueva reserva totalmente dentro del rango de una reserva previa", () => {
    const a = alojamientoBase();
    const r = new Reserva(a, new Date(2025, 9, 22), new Date(2025, 9, 30));

    a.agregarReserva(r);

    expect(
      a.tieneConflictoConFechas(new Date(2025, 9, 25), new Date(2025, 9, 27))
    ).toBe(true);
  });
});
