import { FindOptionsSelect, FindOptionsSelectByString } from "typeorm"
import { AppDataSource } from "../data-source.js"
import { Escuela } from "../entity/Escuela.js"
import { EscuelaNoValidada } from "../entity/EscuelaNoValidada.js"

export type EscuelaType = {
    nombre: string,
    email: string,
    direccion: string,
    telefono: string,
    codigo?: string,
    imgUrl: string
}

export const insertarEscuelaNV = async (escuela: EscuelaType) => {
    const esc = await AppDataSource.createQueryBuilder()
        .insert()
        .into(EscuelaNoValidada)
        .values({
            ...escuela,
            fechaIngreso: new Date()
        }).execute()
    
    return esc.generatedMaps[0].idEscuelaNV as number
}

export const insertarEscuela = async (escuela: EscuelaType) => {
    const esc = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Escuela)
        .values({
            ...escuela,
            fechaIngreso: new Date(),
        }).execute()
    
    return esc.generatedMaps[0].idEscuela as number
}

export const obtenerEscuelasNV = async () => await AppDataSource.getRepository(EscuelaNoValidada).find()
export const obtenerEscuelas = async () => await AppDataSource.getRepository(Escuela).find()
export const obtenerEscuela = async (idEscuela: number) => await AppDataSource.getRepository(Escuela).findOneByOrFail({ idEscuela })

export const selectData: FindOptionsSelect<Escuela> | FindOptionsSelectByString<Escuela> = ["nombre", "direccion", "email", "idEscuela", "imgUrl"]