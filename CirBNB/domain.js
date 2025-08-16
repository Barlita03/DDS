// --- ALOJAMIENTO ---

// Una forma de escribir un "falso enum"
const Categoria = Object.freeze(
    {
        Hotel: "Hotel",
        Departamento: "Departamento",
        Cabaña: "Cabaña",
        Apart: "Apart"
    }
);

class Alojamiento {
    constructor(nombre, precioPorNoche, categoria) {
        this.nombre = nombre;
        this.precioPorNoche = precioPorNoche;
        this.categoria = categoria;
        this.reservas = [];
    }

    agregarReserva(reserva) {
        this.reservas.push(reserva);
    }

    estaReservado(fechaInicio, fechaFin) {
        for (const reserva of this.reservas) {
            if (fechaInicio < reserva.diaFin && fechaFin > reserva.diaInicio) {
                return true;
            }
        }
        return false;
    }

    getDescripcion() {
        return `${this.nombre} (${this.categoria}) - $${this.precioPorNoche}`;
    }
}

// --- RESERVA ---

class Reserva {
    constructor(alojamiento, diaInicio, diaFin) {
        this.verificarFecha(diaInicio);
        this.verificarFecha(diaFin);
        this.verificarEstaReservado(alojamiento, diaInicio, diaFin);

        this.alojamiento = alojamiento;
        this.diaInicio = diaInicio;
        this.diaFin = diaFin;
        this.descuentos = [];

        alojamiento.agregarReserva(this);
    }

    verificarEstaReservado(alojamiento, diaInicio, diaFin) {
        if (alojamiento.estaReservado(diaInicio, diaFin)) {
            throw new Error("El alojamiento se encuentra reservado en la fecha seleccionada");
        }
    }

    verificarFecha(fecha) {
        if (!fecha instanceof Date) {
            throw new Error("diaInicio y diaFin deben ser una instancia de Date");
        }
    }

    cantidadDeNoches() {
        const msPorDia = 24 * 60 * 60 * 1000;
        return Math.ceil((this.diaFin - this.diaInicio) / msPorDia);
    }

    precioBase() {
        return this.cantidadDeNoches() * this.alojamiento.precioPorNoche;
    }

    precioFinal() {
        let precioBase = this.precioBase();
        let totalDescontado = 0;

        for (const descuento of this.descuentos) {
            totalDescontado += descuento.valorDescontado(precioBase, this.cantidadDeNoches());
        }

        return Math.max(0, precioBase - totalDescontado);
    }

    agregarDescuento(descuento) {
        this.descuentos.push(descuento);
    }

    sacarDescuento(descuento) {
        const index = this.descuentos.indexOf(descuento);
        if (index > -1) {
            this.descuentos.splice(index, 1);
        }
    }
}

// --- DESCUENTOS ---

class DescuentoFijo {
    constructor(valorFijo) {
        this.valorFijo = valorFijo;
    }

    valorDescontado(precioBase, cantidad) {
        return this.valorFijo;
    }
}

class DescuentoPorcentaje {
    constructor(porcentaje) {
        this.porcentaje = porcentaje;
    }

    valorDescontado(precioBase, cantidad) {
        return (this.porcentaje / 100) * precioBase;
    }
}

class DescuentoPorNoches {
    constructor(cantidadMinima, porcentaje) {
        this.cantidadMinima = cantidadMinima;
        this.porcentaje = porcentaje;
    }

    valorDescontado(precioBase, cantidad) {
        const vecesRepetido = Math.floor(cantidad / this.cantidadMinima);
        let valorDescontado = 0;
        
        if (vecesRepetido > 0) {
            valorDescontado = (this.porcentaje / 100) * precioBase * vecesRepetido;
        }

        return valorDescontado;
    }
}

// --- EXPORTS ---

module.exports = { Alojamiento, Reserva, Categoria, DescuentoFijo, DescuentoPorcentaje, DescuentoPorNoches };