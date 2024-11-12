import { Request, Response } from "express";
import { validarHorario } from "../functions/HorarioFunc.js";
import { AppDataSource } from "../data-source.js";
import { Curso } from "../entity/Curso.js";
import { Horario } from "../entity/Horario.js";
import { ValidationError } from "../errors/ValidationError.js";

export class HorarioController {
    async crearHorario(req: Request, res: Response) {
        try {
            const { tabla, idCurso } = req.body
            validarHorario(tabla)
            const curso = await AppDataSource.getRepository(Curso).findOneByOrFail({ idCurso })
            const horario = await AppDataSource.getRepository(Horario).findOneBy({ curso })
            if (horario != null) {
                throw new ValidationError("Este curso ya tiene un horario", 69)
            }
            let row = 0
            for (const list of tabla) {
                row += 1
                for (const value of list) {
                    await AppDataSource.createQueryBuilder()
                        .insert()
                        .into(Horario)
                        .values({
                            contenido: value,
                            fila: row,
                            curso
                        }).execute()
                }
            }
            res.status(204).send()
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Curso no encontrado", numero: 47 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo crear el horario", numero: 48 })
            }
        }
    }

    async obtenerHorario(req: Request, res: Response) {
        try {
            const { idCurso } = req.params
            const curso = await AppDataSource.getRepository(Curso).findOneByOrFail({ idCurso: Number(idCurso) })
            const horarios = await AppDataSource.getRepository(Horario).findBy({ curso })
            const listNumbers = horarios.map(x => isNaN(Number(x.fila)) === false && x.fila)
            const setNumerosNoRepetidos = new Set()
            for (const element of listNumbers) {
                setNumerosNoRepetidos.add(element)
            }
            const listaNumerosNoRepetidos = Array.from(setNumerosNoRepetidos)
            const listHorario: Horario[][] = []
            const listaHorarioString: string[][] = []
            for (const num in listaNumerosNoRepetidos) {
                for (const horario of horarios) {
                    if (listaNumerosNoRepetidos[num] === horario.fila) {
                        const existeHorario = listHorario.find(x => x.find(y => y.fila == horario.fila))
                        if (existeHorario) {
                            const index = listHorario.indexOf(existeHorario)
                            listHorario[index].push(horario)
                        } else {
                            listHorario.push([horario])
                        }
                    }
                }
            }
            let row = 0
            let listaString: string[] = []
            for (const lista in listHorario) {
                listaString = []
                row += 1
                for (const horario of listHorario[lista]) {
                    if (horario.fila == row) {
                        listaString.push(horario.contenido)
                    }
                }
                listaHorarioString.push(listaString)
            }
            res.status(200).json(listaHorarioString)
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Curso no encontrado", numero: 47 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo obtener el horario", numero: 48 })
            }
        }
    }

    async editarHorario(req: Request, res: Response) {
        try {
            const { tabla, idCurso } = req.body
            validarHorario(tabla)
            const curso = await AppDataSource.getRepository(Curso).findOneByOrFail({ idCurso })
            const horario = await AppDataSource.getRepository(Horario).findOneBy({ curso })
            if (horario != null) {
                await AppDataSource.getRepository(Horario).delete({ curso })
            }
            let row = 0
            for (const list of tabla) {
                row += 1
                for (const value of list) {
                    await AppDataSource.createQueryBuilder()
                        .insert()
                        .into(Horario)
                        .values({
                            contenido: value,
                            fila: row,
                            curso
                        }).execute()
                }
            }
            res.status(204).send()
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Curso no encontrado", numero: 47 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo guardar el horario", numero: 48 })
            }
        }
    }
}