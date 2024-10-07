import { AppDataSource } from "../data-source.js";
import { Curso } from "../entity/Curso.js";
import { Turno } from "../entity/Turno.js";
import { obtenerEscuelas } from "../functions/EscuelaFunc.js";

export async function insertCurso() {
    const curso = AppDataSource.getRepository(Curso)
    const escuelas = await obtenerEscuelas()
    const turnos = await AppDataSource.getRepository(Turno).find()
    const cursos = [
        { anio: 6, division: "7", escuela: escuelas[0], turno: turnos[0] },
        { anio: 6, division: "5", escuela: escuelas[0], turno: turnos[1] },
        { anio: 6, division: "1", escuela: escuelas[1], turno: turnos[2] }
    ]
    await curso.save(cursos)
}