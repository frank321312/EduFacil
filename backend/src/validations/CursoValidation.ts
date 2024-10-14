import { AppDataSource } from "../data-source.js"
import { Curso } from "../entity/Curso.js"
import { ValidationError } from "../errors/ValidationError.js"

export const validarAnio = (anio: string) => {
    const anioNum = Number(anio)
    if (isNaN(anioNum)) {
        throw new TypeError("Tipo de dato invalido")
    } else if (anioNum < 0 || anioNum > 8) {
        throw new ValidationError("Año fuera de rango", 1)
    }
}

export const validarDivision = (division: string) => {
    const divisionList = division.split("-")

    for (const index of divisionList) {
        const tieneDosElementos = divisionList.filter(x => x == index)
        if (tieneDosElementos.length > 1) {
            throw new ValidationError("No puede haber divisiones repetidas", 2)
        }
    }
    if (!/^[a-zA-Z0-9-]+$/g.test(division)) {
        throw new ValidationError("Texto invalido", 3)
    } else if (division.length > 50) {
        throw new ValidationError("Maximo 25 divisiones", 4)
    } else {
        for (const item of divisionList) {
            if (item.length < 0 || item.length > 2) {
                throw new ValidationError("Cada division solo debe tener dos caracteres como maximo", 5)
            }
        }
    }
}

export const existeCurso = async (anio: number, divison: string[]) => {
    for (const d of divison) {
        const curso = await AppDataSource.getRepository(Curso).findOneBy({ anio, division: d })
        if (curso) {
            throw new ValidationError("Ya existe ese curso, verifiquelo", 6)
        }
    }
}

export const isNumber = (num: string) => {
    if (num == undefined) {
        throw new TypeError("Tipo de dato invalido")
    }
    if (isNaN(Number(num))) {
        throw new TypeError("Tipo de dato invalido")
    }
}