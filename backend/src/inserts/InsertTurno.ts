import { AppDataSource } from "../data-source.js";
import { Turno } from "../entity/Turno.js";

export default async function insertTurno() {
    const turno = AppDataSource.getRepository(Turno)
    const turnos = [
        { nombre: "Mañana" },
        { nombre: "Tarde" },
        { nombre: "Noche" }
    ]
    await turno.save(turnos)
}