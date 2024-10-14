import { AppDataSource } from "./data-source.js";
import express from 'express';
import cursoRoutes from './routes/CursoRoute.js'
import usuarioRoutes from './routes/UsuarioRoute.js'
import escuelaRoutes from './routes/EscuelaRoute.js'
import { Rol } from "./entity/Rol.js";
import { insertCurso } from "./inserts/InsertCurso.js";
import { insertEscuela, insertEscuelaNV } from "./inserts/InsertEscuela.js";
import { insertRol } from "./inserts/InsertRol.js";
import insertTurno from "./inserts/InsertTurno.js";
import { insertUsuario, insertUsuarioNV } from "./inserts/InsertUsuario.js";
import cors from 'cors';

AppDataSource.initialize().then(async () => {
    console.log("Conexion existosa con la base de datos")
    const rol = await AppDataSource.getRepository(Rol).exists({ where: { idRol: 1 } })
    if (!rol) {
        await insertRol(),
        await insertTurno(),
        await insertEscuela(),
        await insertEscuelaNV(),
        await insertCurso(),
        await insertUsuario(),
        await insertUsuarioNV()
    }
}).catch(error => console.log(error))

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 6008

app.use("/api", cursoRoutes)
app.use("/api", usuarioRoutes)
app.use("/api", escuelaRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})