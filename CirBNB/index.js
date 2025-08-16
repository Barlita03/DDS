const { Alojamiento, Reserva, Categoria, DescuentoFijo, DescuentoPorNoches, DescuentoPorcentaje } = require("./domain.js");
const { aumentarPrecioDiario, alojamientoMasCaro, filtrarPorPrecio, obtenerTotalReservas } = require("./funciones.js");

// Instancias de alojamiento

const alojamiento1 = new Alojamiento("Hotel en Buenos Aires", 100, Categoria.Hotel);
console.log(alojamiento1.getDescripcion()); // "Hotel en Buenos Aires (Hotel) - $100"

const alojamiento2 = new Alojamiento("Hotel en Rosario", 100, Categoria.Hotel);
console.log(alojamiento2.getDescripcion()); // "Hotel en Rosario (Hotel) - $100"

const alojamiento3 = new Alojamiento("Hotel en La Pampa", 100, Categoria.Hotel);
console.log(alojamiento3.getDescripcion()); // "Hotel en La Pampa (Hotel) - $100"

console.log("\n");

// Instancias de reserva

const reserva1 = new Reserva(alojamiento1, new Date("2023-10-01"), new Date("2023-10-05"));
console.log(`Cantidad de noches: ${reserva1.cantidadDeNoches()}`);
console.log(`Precio base: $${reserva1.precioBase()}`);

const reserva2 = new Reserva(alojamiento2, new Date("2023-10-01"), new Date("2023-10-05"));
console.log(`Cantidad de noches: ${reserva2.cantidadDeNoches()}`);
console.log(`Precio base: $${reserva2.precioBase()}`);

const reserva3 = new Reserva(alojamiento3, new Date("2023-10-01"), new Date("2023-10-05"));
console.log(`Cantidad de noches: ${reserva3.cantidadDeNoches()}`);
console.log(`Precio base: $${reserva3.precioBase()}`);

// Si un alojamiento esta reservado en esa fecha no me deja reservarlo
try {
    const reserva4 = new Reserva(alojamiento1, new Date("2023-10-04"), new Date("2023-10-08"));
    console.log(`Cantidad de noches: ${reserva4.cantidadDeNoches()}`);
    console.log(`Precio base: $${reserva4.precioBase()}`);
} catch (e) {
    console.error("error: " + e.message);
}

// Testeo los descuentos

console.log("\n");

const descuentoFijo = new DescuentoFijo(100);
reserva1.agregarDescuento(descuentoFijo);

console.log(`Precio final con descuento fijo de $100: $${reserva1.precioFinal()}`);

reserva1.sacarDescuento(descuentoFijo);

const descuentoPorcentaje = new DescuentoPorcentaje(25);
reserva1.agregarDescuento(descuentoPorcentaje);

console.log(`Precio final con descuento del 25%: $${reserva1.precioFinal()}`);

reserva1.sacarDescuento(descuentoPorcentaje);

let descuentoPorNoches = new DescuentoPorNoches(2, 25);
reserva1.agregarDescuento(descuentoPorNoches);

console.log(`Precio final con descuento del 25% por 3 noches: $${reserva1.precioFinal()}`);

console.log("\n");

// Testeo las funciones

aumentarPrecioDiario([alojamiento1, alojamiento2, alojamiento3], 20);
console.log(alojamiento1.getDescripcion()); // "Hotel en Buenos Aires (Hotel) - $120"
console.log(alojamiento2.getDescripcion()); // "Hotel en Rosario (Hotel) - $120"
console.log(alojamiento3.getDescripcion()); // "Hotel en La Pampa (Hotel) - $120"

console.log("\n");

aumentarPrecioDiario([alojamiento1], 10);
console.log(alojamientoMasCaro([alojamiento1, alojamiento2, alojamiento3]));

console.log("\n");

console.log(filtrarPorPrecio([alojamiento1, alojamiento2, alojamiento3], 130));

console.log("\n");

console.log(`Precio total de la reserva 1: $${reserva1.precioFinal()}`);
console.log(`Precio total de la reserva 2: $${reserva2.precioFinal()}`);
console.log(`Precio total de la reserva 3: $${reserva3.precioFinal()}`);
console.log(`Precio total de las reservas: $${obtenerTotalReservas([reserva1, reserva2, reserva3])}`);
