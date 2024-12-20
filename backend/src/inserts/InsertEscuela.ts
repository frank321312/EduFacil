import { insertarEscuela, insertarEscuelaNV } from "../functions/EscuelaFunc.js";
import { url } from "../functions/verifyToken.js";

export async function insertEscuela() {
    await insertarEscuela({
        nombre: "Instituto Técnico Belgrano",
        email: "admin@tecnicobelgrano.edu.ar",
        direccion: "Ruta 40 Km 123, Mendoza",
        telefono: "+54 261 6543-2100",
        codigo: "10045",
        imgUrl: `${url}/get-imagen/et12de1_logo.jpg`
    })

    await insertarEscuela({
        nombre: "Colegio San Martín",
        email: "info@sanmartin.edu.ar",
        direccion: "Av. Libertador 456, Córdoba",
        telefono: "+54 351 9876-5432",
        codigo: "10046",
        imgUrl: `${url}/get-imagen/et12de1_logo.jpg`
    })

    await insertarEscuela({
        nombre: "Escuela Primaria La Esperanza",
        email: "contacto@laesperanza.edu.ar",
        direccion: "Calle Falsa 123, Buenos Aires",
        telefono: "+54 11 1234-5678",
        codigo: "10047",
        imgUrl: `${url}/get-imagen/et12de1_logo.jpg`
    })

    await insertarEscuela({
        nombre: "Escuela Secundaria Rivadavia",
        email: "contacto@rivadavia.edu.ar",
        direccion: "Calle Mitre 789, Rosario",
        telefono: "+54 341 2345-6789",
        codigo: "10048",
        imgUrl: `${url}/get-imagen/et12de1_logo.jpg`
    })
    
    await insertarEscuela({
        nombre: "Instituto Superior San Carlos",
        email: "admin@sancarlos.edu.ar",
        direccion: "Av. San Martín 567, Tucumán",
        telefono: "+54 381 9876-5432",
        codigo: "10049",
        imgUrl: `${url}/get-imagen/et12de1_logo.jpg`
    })
    
    await insertarEscuela({
        nombre: "Escuela Técnica Ingeniero White",
        email: "info@ingwhite.edu.ar",
        direccion: "Av. Alem 1024, Bahía Blanca",
        telefono: "+54 291 4321-5678",
        codigo: "10050",
        imgUrl: `${url}/get-imagen/et12de1_logo.jpg`
    })
    
    await insertarEscuela({
        nombre: "Escuela Normal Sarmiento",
        email: "admin@sarmiento.edu.ar",
        direccion: "Calle San Juan 345, La Plata",
        telefono: "+54 221 7654-3210",
        codigo: "10051",
        imgUrl: `${url}/get-imagen/et12de1_logo.jpg`
    })
    
    await insertarEscuela({
        nombre: "Colegio Nuestra Señora de Luján",
        email: "info@lujan.edu.ar",
        direccion: "Calle Alvear 789, San Juan",
        telefono: "+54 264 8765-4321",
        codigo: "10052",
        imgUrl: `${url}/get-imagen/et12de1_logo.jpg`
    })
}

export async function insertEscuelaNV() {
    await insertarEscuelaNV({
        nombre: "Escuela Secundaria Bartolomé Mitre",
        email: "contacto@bartolomemitre.edu.ar",
        direccion: "Calle Mitre 789, Rosario",
        telefono: "+54 341 4321-8765",
        codigo: "ESC04",
        imgUrl: "https://media.licdn.com/dms/image/v2/C4D0BAQFIXMo0FGF4Pw/company-logo_200_200/company-logo_200_200/0/1674861063620/et12de1_logo?e=2147483647&v=beta&t=IAaExw9FrGXjt4mdNX67dnyV1slw3-lwtDNyfjKoPpE"
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