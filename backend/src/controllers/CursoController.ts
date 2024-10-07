import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Curso } from "../entity/Curso.js";
import { validarAnio, validarDivision } from "../validations/CursoValidation.js";
import { obtenerEscuela } from "../functions/EscuelaFunc.js";
import { Turno } from "../entity/Turno.js";

export class CursoController {
    async obtenerCursos(_req: Request, res: Response) {
        try {
            const cursos = await AppDataSource.getRepository(Curso).find()
            res.status(200).json(cursos)
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "Cursos no encontrados" })
        }
    }

    async crearCurso(req: Request, res: Response) {
        try {
            const { anio, division, idEscuela, idTurno } = req.body
            validarAnio(anio)
            validarDivision(division)
            const divisionList: string[] = division.split("-")
            if (divisionList[divisionList.length - 1] == "") {
                divisionList.pop()
            }
            const escuela = await obtenerEscuela(idEscuela)
            const turno = await AppDataSource.getRepository(Turno).findOneByOrFail({ idTurno })
            for (const item of divisionList) {
                await AppDataSource.createQueryBuilder()
                    .insert()
                    .into(Curso)
                    .values({
                        anio,
                        division: item,
                        escuela,
                        turno
                    }).execute()
            }
            res.status(204).send()
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: 1})
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Registro no encontrado", numero: 2 })
            } else if (error.name === "TypeError") {
                res.status(400).json({ message: error.message, numero: 3})
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo crear el curso", numero: 4 })
            }
        }
    }

    async eliminarCurso(req: Request, res: Response) {
        try {
            const { idCurso } = req.params
            const curso = await AppDataSource.getRepository(Curso).findOneByOrFail({ idCurso: Number(idCurso) })
            await AppDataSource.getRepository(Curso).delete(curso)
            res.status(204).send()
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Curso no encontrado", numero: 5 })
            } else {
                res.status(500).json({ message: "No se pudo eliminar el curso", numero: 6 })
            }
        }
    }

    async modificarCurso(req: Request, res: Response) {
        try {
            const { anio, division, idTurno, idCurso } = req.body
            const turno = await AppDataSource.getRepository(Turno).findOneByOrFail({ idTurno })
            await AppDataSource.getRepository(Curso).update({ idCurso }, { anio, division, turno })
            res.status(204).send()
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Curso no encontrado", numero: 7 })
            } else {
                res.status(500).json({ message: "No se pudo modificar el curso", numero: 8 })
            }
        }
    }

    async obtenerCurso(req: Request, res: Response) {
        try {
            const { search } = req.params
            
            const curso = await AppDataSource.getRepository(Curso).findOneByOrFail({ idCurso })
            res.status(200).json(curso)
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Curso no encontrado", numero: 7 })
            } else {
                res.status(500).json({ message: "No se pudo obtener el curso ", numero: 8 })
            }
        }
    }
}