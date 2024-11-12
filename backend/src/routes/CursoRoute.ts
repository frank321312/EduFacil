import { NextFunction, Request, Response, Router } from "express";
import { CursoController } from "../controllers/CursoController.js";
import { verifyToken } from "../functions/verifyToken.js";

const router = Router()
const cursoController = new CursoController()

router.get("/obtenercursos/:idEscuela", cursoController.obtenerCursos)
router.get("/obtenercurso/:idEscuela/:search", cursoController.obtenerCurso)

router.post("/crearcurso", verifyToken, cursoController.crearCurso)
router.put("/modificar-curso/:idCurso", verifyToken, cursoController.modificarCurso)

router.delete("/eliminar-curso/:idCurso", verifyToken, cursoController.eliminarCurso)

export default router