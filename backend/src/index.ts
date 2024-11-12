import { AppDataSource } from "./data-source.js";
import express, { Request, Response } from 'express';
import cursoRoutes from './routes/CursoRoute.js'
import usuarioRoutes from './routes/UsuarioRoute.js'
import escuelaRoutes from './routes/EscuelaRoute.js'
import turnoRoutes from './routes/TurnoRoute.js'
import horarioRoutes from './routes/HorarioRoute.js'
import { Rol } from "./entity/Rol.js";
import { insertCurso } from "./inserts/InsertCurso.js";
import { insertEscuela, insertEscuelaNV } from "./inserts/InsertEscuela.js";
import { insertRol } from "./inserts/InsertRol.js";
import insertTurno from "./inserts/InsertTurno.js";
import { insertUsuario, insertUsuarioNV } from "./inserts/InsertUsuario.js";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import path, { dirname, join } from "path";
import { fileURLToPath } from "node:url";
import uploadRoutes from './routes/UploadRoute.js'

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
export const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uplodas")))
app.use(cors())
dotenv.config()
const PORT = process.env.PORT || 6008

app.get('/get-imagen/:image', (req, res) => {
    res.sendFile(join(__dirname, `/uploads/${req.params.image}`))
});

app.post("/api/token", (req: Request, res: Response) => {
    try {
        const { token } = req.body
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        res.status(204).send()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Token expirado", error: 1 })
        } else if (error.name === 'JsonWebTokenError') {
            res.status(400).json({ message: "Token invalido", error: 2 })
        } else {
            res.status(500).json({ message: "Error interno del servidor", error: 3 })
        }
    }
})

app.use("/api", cursoRoutes)
app.use("/api", usuarioRoutes)
app.use("/api", escuelaRoutes)
app.use("/api", uploadRoutes)
app.use("/api", turnoRoutes)
app.use("/api", horarioRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})