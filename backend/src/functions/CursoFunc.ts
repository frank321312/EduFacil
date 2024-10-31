import { AppDataSource } from "../data-source.js";
import { Curso } from "../entity/Curso.js";

export const selectDataCurso = async (idEscuela: string) => {
    const cursos = await AppDataSource.getRepository(Curso).find({
        relations: { escuela: true, turno: true },
        where: { escuela: { idEscuela: Number(idEscuela) } },
        select: { idCurso: true, anio: true, division: true, escuela: { idEscuela: true } }
    })

    return cursos
}

export const obtenerCursoPorAnio = async (idEscuela: string, anio: number) => {
    const cursos = await AppDataSource.getRepository(Curso).find({
        relations: { escuela: true, turno: true },
        where: { escuela: { idEscuela: Number(idEscuela) }, anio },
        select: { idCurso: true, anio: true, division: true, escuela: { idEscuela: true } }
    })

    return cursos
}

export const obtenerCursoPorAnioDivison = async (idEscuela: string, anio: number, division: string = "") => {
    const cursos = await AppDataSource.getRepository(Curso).find({
        relations: { escuela: true, turno: true },
        where: { escuela: { idEscuela: Number(idEscuela) }, anio, division },
        select: { idCurso: true, anio: true, division: true, escuela: { idEscuela: true } }
    })

    return cursos
}