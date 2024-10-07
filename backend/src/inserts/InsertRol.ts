import { AppDataSource } from "../data-source.js";
import { Rol } from "../entity/Rol.js";

export async function insertRol() {
    const rol = AppDataSource.getRepository(Rol)
    const roles = [
        { nombre: "Escuela" },
        { nombre: "Estudiante" },
        { nombre: "Docente" }
    ]
    await rol.save(roles)
}