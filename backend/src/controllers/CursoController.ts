import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Curso } from "../entity/Curso.js";
import { existeCurso, validarAnio, validarDivision } from "../validations/CursoValidation.js";
import { obtenerEscuela } from "../functions/EscuelaFunc.js";
import { Turno } from "../entity/Turno.js";
import { EntityNotFoundError } from "typeorm";
import { isNumber } from "../validations/CursoValidation.js";
import { obtenerCursoPorAnio, obtenerCursoPorAnioDivison, selectDataCurso } from "../functions/CursoFunc.js";
import { ValidationError } from "../errors/ValidationError.js";

export class CursoController {
    async obtenerCursos(req: Request, res: Response) {
        try {
            const { idEscuela } = req.params
            const cursos = await selectDataCurso(idEscuela)
            res.status(200).json(cursos)
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: "Cursos no encontrados" })
        }
    }

    async crearCurso(req: Request, res: Response) {
        try {
            const { anio, division, idEscuela, idTurno } = req.body
            console.log(req.body)
            if (!anio) {
                throw new ValidationError("El año no puede estar vacio", 70)
            } else if (!division) {
                throw new ValidationError("la division no puede estar vacia", 71)
            }
            validarAnio(anio)
            validarDivision(division)
            const divisionList: string[] = division.split("-")
            await existeCurso(anio, divisionList)
            if (divisionList[divisionList.length - 1] == "") {
                divisionList.pop()
            }
            const escuela = await obtenerEscuela(idEscuela)
            const turno = await AppDataSource.getRepository(Turno).findOneByOrFail({ idTurno })
            for (const item of divisionList) {
                if (item != "") {
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
            }
            res.status(204).send()
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Registro no encontrado", numero: 10 })
            } else if (error.name === "TypeError") {
                res.status(400).json({ message: error.message, numero: 11 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo crear el curso", numero: 12 })
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
                res.status(404).json({ message: "Curso no encontrado", numero: 13 })
            } else {
                res.status(500).json({ message: "No se pudo eliminar el curso", numero: 14 })
            }
        }
    }

    async modificarCurso(req: Request, res: Response) {
        try {
            const { anio, division, idTurno } = req.body
            const { idCurso } = req.params
            const turno = await AppDataSource.getRepository(Turno).findOneByOrFail({ idTurno })
            const curso = await AppDataSource.getRepository(Curso).findOneByOrFail({ idCurso: Number(idCurso) })
            AppDataSource.getRepository(Curso).merge(curso, { anio, division, turno })
            res.status(204).send()
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Curso no encontrado", numero: 15 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo modificar el curso", numero: 16 })
            }
        }
    }

    async obtenerCurso(req: Request, res: Response) {
        try {
            const { idEscuela, search } = req.params
            console.log(req.params)
            let cursos: Curso[]
            let tieneDvision = false
            if (search.indexOf("-") != -1) {
                if (search[search.indexOf("-") + 1] != undefined) tieneDvision = true 
            }
            if (tieneDvision) {
                const searchList = search.split("-")
                isNumber(searchList[0])
                cursos = await obtenerCursoPorAnioDivison(idEscuela, Number(searchList[0]), searchList[1])
            } else {
                const searchList = search.split("-")
                isNumber(searchList[0])
                cursos = await obtenerCursoPorAnio(idEscuela, Number(searchList[0]))
            }
            if (cursos.length === 0) {
                throw new EntityNotFoundError(Curso, null)
            }
            res.status(200).json(cursos)
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Curso no encontrado", numero: 17 })
            } else if (error.name === "TypeError") {
                res.status(404).json({ message: "El año debe ser numerico", numero: 18 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo obtener el curso ", numero: 19 })
            }
        }
    }
}