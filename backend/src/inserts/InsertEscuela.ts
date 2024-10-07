import { insertarEscuela, insertarEscuelaNV } from "../functions/EscuelaFunc.js";

export async function insertEscuela() {
    await insertarEscuela({
        nombre: "Instituto Técnico Belgrano",
        email: "admin@tecnicobelgrano.edu.ar",
        direccion: "Ruta 40 Km 123, Mendoza",
        telefono: "+54 261 6543-2100",
        codigo: "ESC03",
        imgUrl: "https://example.com/img/escuela3.jpg"
    })

    await insertarEscuela({
        nombre: "Colegio San Martín",
        email: "info@sanmartin.edu.ar",
        direccion: "Av. Libertador 456, Córdoba",
        telefono: "+54 351 9876-5432",
        codigo: "ESC02",
        imgUrl: "https://example.com/img/escuela2.jpg"
    })

    await insertarEscuela({
        nombre: "Escuela Primaria La Esperanza",
        email: "contacto@laesperanza.edu.ar",
        direccion: "Calle Falsa 123, Buenos Aires",
        telefono: "+54 11 1234-5678",
        codigo: "ESC01",
        imgUrl: "https://example.com/img/escuela1.jpg"
    })
}

export async function insertEscuelaNV() {
    await insertarEscuelaNV({
        nombre: "Escuela Secundaria Bartolomé Mitre",
        email: "contacto@bartolomemitre.edu.ar",
        direccion: "Calle Mitre 789, Rosario",
        telefono: "+54 341 4321-8765",
        codigo: "ESC04",
        imgUrl: "https://example.com/img/escuela4.jpg"
    })

    await insertarEscuelaNV({
        nombre: "Colegio Nuestra Señora de la Merced",
        email: "info@nsdelamerced.edu.ar",
        direccion: "Pasaje Independencia 234, Salta",
        telefono: "+54 387 9876-5432",
        codigo: "ESC05",
        imgUrl: "https://example.com/img/escuela5.jpg"
    })

    await insertarEscuelaNV({
        nombre: "Instituto Educativo Río de la Plata",
        email: "admin@riodelaplata.edu.ar",
        direccion: "Av. Rivadavia 1024, La Plata",
        telefono: "+54 221 6543-2100",
        codigo: "ESC06",
        imgUrl: "https://example.com/img/escuela6.jpg"
    })
}