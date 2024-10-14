import { EntityTarget, ObjectLiteral } from "typeorm"
import { AppDataSource } from "../data-source.js"
import { ValidationError } from "../errors/ValidationError.js"

export const validarNombre = (texto: string) => {
    const espacio = texto.indexOf(" ")
    if (texto[espacio + 1] === " ") {
        throw new ValidationError("No puede haber un espacio despues de otro", 41)
    } else if (texto[0] === " ") {
        throw new ValidationError("No puede comenzar con un espacio", 41)
    } else if (texto[texto.length - 1] === " ") {
        throw new ValidationError("No puede terminar con un espacio", 41)
    } else if (texto.length < 20 || texto.length > 255) {
        throw new ValidationError("Minimo 20 caracteres, maximo 255", 41)
    }
}

export const validarDireccion = (texto: string) => {
    const espacio = texto.indexOf(" ")
    if (texto[espacio + 1] === " ") {
        throw new ValidationError("No puede haber un espacio despues de otro", 42)
    } else if (texto[0] === " ") {
        throw new ValidationError("No puede comenzar con un espacio", 42)
    } else if (texto[texto.length - 1] === " ") {
        throw new ValidationError("No puede terminar con un espacio", 42)
    } else if (texto.length < 20 || texto.length > 255) {
        throw new ValidationError("Minimo 20 caracteres, maximo 255", 42)
    }
}

export const validarTelefono = (telefono: string) => {
    if (telefono.length < 8 || telefono.length > 15) {
        throw new ValidationError("Numero invalido", 43)
    } else if (Number(telefono) < 0) {
        throw new ValidationError("Numero invalido", 43)
    } else if (telefono.includes(" ")) {
        throw new ValidationError("Numero invalido", 43)
    }
}

export const existeNombre = async (entidad: EntityTarget<ObjectLiteral>, nombre: string) => await AppDataSource.getRepository(entidad).exists({ where: { nombre } })
export const existeTelefono = async (entidad: EntityTarget<ObjectLiteral>, telefono: string) => await AppDataSource.getRepository(entidad).exists({ where: { telefono } })