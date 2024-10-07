import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Turno } from "../entity/Turno.js";

export class TurnoController {
    async obtenerTurnos(_req: Request, res: Response) {
        try {
            const turnos = await AppDataSource.getRepository(Turno).find()
            res.status(200).json(turnos)
        } catch (error) {
            res.status(404).json({ message: "No se ha encontrado los turnos" })
        }
    }

    async buscarTurno(req: Request, res: Response) {
        try {
            const { idTurno } = req.params
            const turnos = await AppDataSource.getRepository(Turno).find({ where: { idTurno: Number(idTurno) } })
            res.status(200).json(turnos)
        } catch (error) {
            res.status(404).json({ message: "No se ha encontrado los turnos" })
        }
    }
}