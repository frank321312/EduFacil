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
        throw new Error("Method not implemented.");
    }

    async modificarCurso(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}