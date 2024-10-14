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

    await insertarEscuela({
        nombre: "Escuela Secundaria Rivadavia",
        email: "contacto@rivadavia.edu.ar",
        direccion: "Calle Mitre 789, Rosario",
        telefono: "+54 341 2345-6789",
        codigo: "ESC04",
        imgUrl: "https://example.com/img/escuela4.jpg"
    })
    
    await insertarEscuela({
        nombre: "Instituto Superior San Carlos",
        email: "admin@sancarlos.edu.ar",
        direccion: "Av. San Martín 567, Tucumán",
        telefono: "+54 381 9876-5432",
        codigo: "ESC05",
        imgUrl: "https://example.com/img/escuela5.jpg"
    })
    
    await insertarEscuela({
        nombre: "Escuela Técnica Ingeniero White",
        email: "info@ingwhite.edu.ar",
        direccion: "Av. Alem 1024, Bahía Blanca",
        telefono: "+54 291 4321-5678",
        codigo: "ESC06",
        imgUrl: "https://example.com/img/escuela6.jpg"
    })
    
    await insertarEscuela({
        nombre: "Escuela Normal Sarmiento",
        email: "admin@sarmiento.edu.ar",
        direccion: "Calle San Juan 345, La Plata",
        telefono: "+54 221 7654-3210",
        codigo: "ESC07",
        imgUrl: "https://example.com/img/escuela7.jpg"
    })
    
    await insertarEscuela({
        nombre: "Colegio Nuestra Señora de Luján",
        email: "info@lujan.edu.ar",
        direccion: "Calle Alvear 789, San Juan",
        telefono: "+54 264 8765-4321",
        codigo: "ESC08",
        imgUrl: "https://example.com/img/escuela8.jpg"
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