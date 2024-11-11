import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { UsuarioNoValidado } from "./entity/UsuarioNoValidado.js";
import { Usuario } from "./entity/Usuario.js";
import { Escuela } from "./entity/Escuela.js";
import { EscuelaNoValidada } from "./entity/EscuelaNoValidada.js";
import { Turno } from "./entity/Turno.js";
import { Curso } from "./entity/Curso.js";
import { Rol } from "./entity/Rol.js";
import { Horario } from "./entity/Horario.js";

dotenv.config()
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Rol, Turno, Curso, Usuario, UsuarioNoValidado, Escuela, EscuelaNoValidada, Horario],
    migrations: [],
    subscribers: [],
})