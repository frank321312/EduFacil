import { ValidationError } from "../errors/ValidationError.js"

export const validarAnio = (anio: string) => {
    const anioNum = Number(anio)
    console.log(anioNum)
    if (isNaN(anioNum)) {
        throw new TypeError("Tipo de dato invalido")
    } else if (anioNum < 0 || anioNum > 8) {
        throw new ValidationError("Año fuera de rango")
    }
}

export const validarDivision = (division: string) => {
    const divisionList = division.split("-")
    console.log(divisionList)
    if (!/^[a-zA-Z0-9-]+$/g.test(division)) {
        throw new ValidationError("Texto invalido")
    } else if (division.length > 50) {
        throw new ValidationError("Maximo 25 divisiones")
    } else {
        for (const item of divisionList) {
            if (item.length < 0 || item.length > 2) {
                throw new ValidationError("Cada division solo debe tener dos caracteres como maximo")
            }
        }
    }
}