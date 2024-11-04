import { EntityTarget, ObjectLiteral } from "typeorm"
import { ValidationError } from "../errors/ValidationError.js"
import { AppDataSource } from "../data-source.js"

export const validarNombreUsuario = (username: string) => {
    if (username.length < 3 || username.length >= 30) {
        throw new ValidationError("Minimo 3 caracteres, maximo 30", 21)
    }
    // Obtenemos todos los espacio de la cadena
    const listSpace = username.match(/\s/g)
    // Lo pasomos a string, si no hay espacio es una cedena vacia por defecto
    let spaceString = listSpace != null ? listSpace[0] : ""
    // Usamos un expresion regular para obtener toda la cadena que le sigue despues de un espacio
    const listData = username.match(/(?<=\s).*/g)
    // Si La cadena despues del espacio esta vacia se le asigna un valor por defecto para que no haya errores
    let dataString = listData != null ? listData[0] : "value defect"
    if (spaceString.length > 1) {
        throw new ValidationError("Solo puede haber un espacio", 21)
    } else if (dataString.length < 3) {
        throw new ValidationError("Debe ingresar algo despues del espacio", 21)
    } else if (/^[^\s][a-zA-Z0-9\s]+[^\s]$/.test(username) == false) {
        throw new ValidationError(`Nombre de usuario invalido`, 21)
    }
}

export const validarNombre = (propiedad: string) => {
    if (propiedad.length < 3 || propiedad.length >= 30) {
        throw new ValidationError("Minimo 3 caracteres, maximo 30", 22)
    }
    // Obtenemos todos los espacio de la cadena
    const listSpace = propiedad.match(/\s/g)
    // Lo pasomos a string, si no hay espacio es una cedena vacia por defecto
    let spaceString = listSpace != null ? listSpace[0] : ""
    // Usamos un expresion regular para obtener toda la cadena que le sigue despues de un espacio
    const listData = propiedad.match(/(?<=\s).*/g)
    // Si La cadena despues del espacio esta vacia se le asigna un valor por defecto para que no haya errores
    let dataString = listData != null ? listData[0] : "value defect"
    if (spaceString.length > 1) {
        throw new ValidationError("Solo puede haber un espacio", 22)
    } else if (dataString.length < 3) {
        throw new ValidationError("Debe ingresar algo despues del espacio", 22)
    } else if (/^[^\s][a-zA-Z\s]+[^\s]$/.test(propiedad) == false) {
        throw new ValidationError(`Nombre invalido`, 22)
    }
}

export const validarApellido = (propiedad: string) => {
    if (propiedad.length < 3 || propiedad.length >= 30) {
        throw new ValidationError("Minimo 3 caracteres, maximo 30", 38)
    }
    // Obtenemos todos los espacio de la cadena
    const listSpace = propiedad.match(/\s/g)
    // Lo pasomos a string, si no hay espacio es una cedena vacia por defecto
    let spaceString = listSpace != null ? listSpace[0] : ""
    // Usamos un expresion regular para obtener toda la cadena que le sigue despues de un espacio
    const listData = propiedad.match(/(?<=\s).*/g)
    // Si La cadena despues del espacio esta vacia se le asigna un valor por defecto para que no haya errores
    let dataString = listData != null ? listData[0] : "value defect"
    if (spaceString.length > 1) {
        throw new ValidationError("Solo puede haber un espacio", 38)
    } else if (dataString.length < 3) {
        throw new ValidationError("Debe ingresar algo despues del espacio", 38)
    } else if (/^[^\s][a-zA-Z\s]+[^\s]$/.test(propiedad) == false) {
        throw new ValidationError(`Apellido invalido`, 38)
    }
}

export const validarCorreo = (email: string) => {
    // Obtenemos todos los caracteres antes de @
    const emailMatchBefore = email.match(/.*@/g)
    // Obtenemos todos los caracteres despues de @
    const emailMatchAfter = email.match(/@.*/g)
    if (email.length > 50) {
        throw new ValidationError("El email no puede contener mas de 50 caracteres", 23)
    } else if (/\s/.test(email)) {
        throw new ValidationError("No debe contener espacios", 23)
    } else if (/@/.test(email) == false) {
        throw new ValidationError("El email no contiene '@'", 23)
    } else if (emailMatchBefore[0].length < 3 || emailMatchAfter[0].length < 3) {
        throw new ValidationError("Email invalido a", 23)
    } else if (emailMatchAfter[0].indexOf(".") == -1) {
        throw new ValidationError("Email invalido b", 23)
    }
}

export const validarPassowrd = (pass: string) => {
    if (pass.length < 8 || pass.length >= 20) {
        throw new ValidationError("Minimo 8 caracteres, maximo 20", 24)
    } else if (/\s/.test(pass)) {
        throw new ValidationError("No debe contener espacios", 24)
    } else if (/(?=.*[a-z])/.test(pass) == false) {
        throw new ValidationError("Debe contener una letra minuscula", 24)
    } else if (/(?=.*[A-Z])/.test(pass) == false) {
        throw new ValidationError("Debe contener una letra mayuscula", 24)
    } else if (/(?=.*\d)/.test(pass) == false) {
        throw new ValidationError("Debe contener un numero", 24)
    }
}

export const existeEmail = async (entidad: EntityTarget<ObjectLiteral>, email: string) => await AppDataSource.getRepository(entidad).exists({ where: { email } })
export const existeNombre = async (entidad: EntityTarget<ObjectLiteral>, username: string) => await AppDataSource.getRepository(entidad).exists({ where: { nombreUsuario: username } })