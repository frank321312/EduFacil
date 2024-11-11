import { ValidationError } from "../errors/ValidationError.js"

export const validarHorario = (table: string[][]) => {
    for (const list of table) {
        for (const value of list) {
            if (value.length > 50) {
                throw new ValidationError("Cada celda no puede tener mas de 50 caracteres", 30)
            }
        }
    }
}