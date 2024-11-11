import { NextFunction, Request, Response, Router } from "express";
import { CursoController } from "../controllers/CursoController.js";
import { verifyToken } from "../functions/verifyToken.js";

const router = Router()
const cursoController = new CursoController()

router.get("/obtenercursos/:idEscuela", cursoController.obtenerCursos)
router.get("/obtenercurso/:idEscuela/:search", cursoController.obtenerCurso)

router.post("/crearcurso", verifyToken, cursoController.crearCurso)

export default router