import { AppDataSource } from "../data-source.js";
import { Escuela } from "../entity/Escuela.js";
import { Rol } from "../entity/Rol.js";
import { Usuario } from "../entity/Usuario.js";
import { UsuarioNoValidado } from "../entity/UsuarioNoValidado.js";

export type UsuarioType = {
    nombreUsuario: string,
    nombre: string,
    apellido: string,
    password: string,
    email: string,
    codigo: string
};

export const insertarUsuarioNV = async (usuario: UsuarioType, idRol: number, idEscuela: number) => {
    const user = await AppDataSource.createQueryBuilder()
        .insert()
        .into(UsuarioNoValidado)
        .values({
            ...usuario,
            fechaIngreso: new Date,
            idRol,
            idEscuela
        }).execute()

    return user.generatedMaps[0].idUsuarioNV as number
}

export const insertarUsuario = async (usuario: UsuarioType, rol: Rol, escuela: Escuela) => {
    const user = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Usuario)
        .values({
            ...usuario,
            fechaIngreso: new Date(),
            habilitado: false,
            rol,
            escuela
        }).execute()

    return await obtenerDatoUsuarioAuth(user.generatedMaps[0].idUsuario)
}

export const obtenerDatoUsuarioAuth = async (id: number) => {
    const user = await AppDataSource.getRepository(Usuario).findOneOrFail({ where: { idUsuario: id }, relations: { escuela: true, rol: true }, select: { escuela: { idEscuela: true }, idUsuario: true, nombreUsuario: true, rol: { idRol: true } } })
    return user
}

export const obtenerDatoUsuarioAll = async (idUsuario: number) => await AppDataSource.getRepository(Usuario).findBy({ idUsuario })

export const generarNumeroCincoDigitos = () => Math.floor(10000 + Math.random() * 90000)