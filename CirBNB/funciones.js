export function aumentarPrecioDiario(alojamientos, monto) {
  alojamientos.forEach((alojamiento) => {
    alojamiento.precioPorNoche += monto;
  });
}

export function alojamientoMasCaro(alojamientos) {
  const listaDePrecios = alojamientos.map((a) => {
    return a.precioPorNoche;
  });

  const precioMaximo = Math.max(...listaDePrecios);
  const alojamiento = alojamientos.find(
    (a) => a.precioPorNoche === precioMaximo,
  );

  return alojamiento;
}

export function filtrarPorPrecio(alojamientos, precio) {
  return alojamientos.filter((a) => a.precioPorNoche < precio);
}

export function obtenerTotalReservas(reservas) {
  // "reduce" es igual que el "fold" de haskell, el 0 es el valor inicial
  return reservas.reduce((total, reserva) => {
    return total + reserva.precioFinal();
  }, 0);
}

export function filtrarPorCaracteristicas(alojamientos, caracteristicas) {
  return alojamientos.filter((a) =>
    caracteristicas.every((c) => a.caracteristicas.includes(c)),
  );
}
