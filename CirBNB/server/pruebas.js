import chalk from "chalk";
import figlet from "figlet";
import {
  Alojamiento,
  Reserva,
  Categoria,
  DescuentoFijo,
  DescuentoPorNoches,
  DescuentoPorcentaje,
  Caracteristica,
} from "./domain.js";
import {
  aumentarPrecioDiario,
  alojamientoMasCaro,
  filtrarPorPrecio,
  obtenerTotalReservas,
  filtrarPorCaracteristicas,
} from "./funciones.js";
import express from "express";
import { z } from "zod";

// Instancias de alojamiento

const alojamiento1 = new Alojamiento(
  "Hotel en Buenos Aires",
  100,
  Categoria.Hotel
);
console.log(alojamiento1.getDescripcion()); // "Hotel en Buenos Aires (Hotel) - $100"

const alojamiento2 = new Alojamiento("Hotel en Rosario", 100, Categoria.Hotel);
console.log(alojamiento2.getDescripcion()); // "Hotel en Rosario (Hotel) - $100"

const alojamiento3 = new Alojamiento("Hotel en La Pampa", 100, Categoria.Hotel);
console.log(alojamiento3.getDescripcion()); // "Hotel en La Pampa (Hotel) - $100"

console.log("\n");

// Instancias de reserva

const reserva1 = new Reserva(
  alojamiento1,
  new Date("2023-10-01"),
  new Date("2023-10-05")
);
console.log(`Cantidad de noches: ${reserva1.cantidadDeNoches()}`);
console.log(`Precio base: $${reserva1.precioBase()}`);

const reserva2 = new Reserva(
  alojamiento2,
  new Date("2023-10-01"),
  new Date("2023-10-05")
);
console.log(`Cantidad de noches: ${reserva2.cantidadDeNoches()}`);
console.log(`Precio base: $${reserva2.precioBase()}`);

const reserva3 = new Reserva(
  alojamiento3,
  new Date("2023-10-01"),
  new Date("2023-10-05")
);
console.log(`Cantidad de noches: ${reserva3.cantidadDeNoches()}`);
console.log(`Precio base: $${reserva3.precioBase()}`);

// Si un alojamiento esta reservado en esa fecha no me deja reservarlo
try {
  const reserva4 = new Reserva(
    alojamiento1,
    new Date("2023-10-04"),
    new Date("2023-10-08")
  );
  console.log(`Cantidad de noches: ${reserva4.cantidadDeNoches()}`);
  console.log(`Precio base: $${reserva4.precioBase()}`);
} catch (e) {
  console.error("error: " + e.message);
}

// Testeo los descuentos

console.log("\n");

const descuentoFijo = new DescuentoFijo(100);
reserva1.agregarDescuento(descuentoFijo);

console.log(
  `Precio final con descuento fijo de $100: $${reserva1.precioFinal()}`
);

reserva1.sacarDescuento(descuentoFijo);

const descuentoPorcentaje = new DescuentoPorcentaje(25);
reserva1.agregarDescuento(descuentoPorcentaje);

console.log(`Precio final con descuento del 25%: $${reserva1.precioFinal()}`);

reserva1.sacarDescuento(descuentoPorcentaje);

let descuentoPorNoches = new DescuentoPorNoches(2, 25);
reserva1.agregarDescuento(descuentoPorNoches);

console.log(
  `Precio final con descuento del 25% por 3 noches: $${reserva1.precioFinal()}`
);

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
console.log(
  `Precio total de las reservas: $${obtenerTotalReservas([
    reserva1,
    reserva2,
    reserva3,
  ])}`
);

console.log("\n");

alojamiento1.agregarCaracteristica(Caracteristica.Wifi);
alojamiento2.agregarCaracteristica(Caracteristica.Wifi);
alojamiento2.agregarCaracteristica(Caracteristica.Pileta);

console.log(
  filtrarPorCaracteristicas(
    [alojamiento1, alojamiento2, alojamiento3],
    [Caracteristica.Wifi]
  )
);
console.log(
  filtrarPorCaracteristicas(
    [alojamiento1, alojamiento2, alojamiento3],
    [Caracteristica.Pileta]
  )
);

// Figlet

figlet("Bienvenido a CirBNB", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

// Chalk

console.log(chalk.blue("Gracias por usar nuestra app!"));

// API

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("ok");
});

const alojamientos = [alojamiento1, alojamiento2, alojamiento3];

function alojamientoADTO(alojamiento) {
  return {
    nombre: alojamiento.nombre,
    precioPorNoche: alojamiento.precioPorNoche,
    categoria: alojamiento.categoria,
    caracteristicas: alojamiento.caracteristicas,
    reservas: alojamiento.reservas.map((reserva) => ({
      diaInicio: reserva.diaInicio,
      diaFin: reserva.diaFin,
    })),
  };
}

app.get("/api/v1/alojamientos", (req, res) => {
  const max_price = req.query.max_price;

  if (!max_price) {
    res.json(alojamientos.map(alojamientoADTO));
  }

  res.json(
    alojamientos
      .filter((a) => a.precioPorNoche <= parseFloat(max_price))
      .map(alojamientoADTO)
  );
});

app.get("/api/v1/alojamientos/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const alojamiento = alojamientos.find((a) => a.nombre === nombre);

  if (!alojamiento) {
    res.status(404).send("Alojamiento no encontrado");
    return;
  }

  res.json(alojamientoADTO(alojamiento));
});

app.post("/api/v1/alojamientos", express.json(), (req, res) => {
  const body = req.body;
  const resultBody = alogamientoSchema.safeParse(body);

  if (resultBody.error) {
    res.status(400).json(resultBody.error.issues);
    return;
  }

  const nuevoAlojamientoDTO = resultBody.data;
  const nuevoAlojamiento = new Alojamiento(
    nuevoAlojamientoDTO.nombre,
    nuevoAlojamientoDTO.precioPorNoche,
    nuevoAlojamientoDTO.categoria
  );
  alojamientos.push(nuevoAlojamiento);

  res.status(201).json(alojamientoADTO(nuevoAlojamiento));
});

app.delete("/api/v1/alojamientos/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const index = alojamientos.findIndex((a) => a.nombre === nombre);

  if (index === -1) {
    res.status(404).send("Alojamiento no encontrado");
    return;
  }

  alojamientos.splice(index, 1);
  res.status(204).send();
});

app.put("/api/v1/alojamientos/:nombre", (req, res) => {
  const body = req.body;
  const resultBody = alogamientoSchema.safeParse(body);

  if (resultBody.error) {
    res.status(400).json(resultBody.error.issues);
    return;
  }

  const alojamientoActualizadoDTO = resultBody.data;
  const alojamientoExistente = alojamientos.find(
    (a) => a.nombre === req.params.nombre
  );

  if (!alojamientoExistente) {
    res.status(404).send("Alojamiento no encontrado");
    return;
  }

  alojamientoExistente.nombre = alojamientoActualizadoDTO.nombre;
  alojamientoExistente.precioPorNoche =
    alojamientoActualizadoDTO.precioPorNoche;
  alojamientoExistente.categoria = alojamientoActualizadoDTO.categoria;

  res.json(alojamientoADTO(alojamientoExistente));
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const alogamientoSchema = z.object({
  nombre: z.string().min(3).max(20),
  precioPorNoche: z.number().positive(),
  categoria: z.string(),
  caracteristicas: z.array(z.enum(Object.values(Caracteristica))).optional(),
});
