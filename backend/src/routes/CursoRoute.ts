import { NextFunction, Request, Response, Router } from "express";
import { CursoController } from "../controllers/CursoController.js";

const router = Router()
const cursoController = new CursoController()

// router.use((req: Request, res: Response, next: NextFunction) => {
//     console.log(req.body)
//     next()
// })
router.get("/obtenercursos", cursoController.obtenerCursos)
router.get("/obtenetcurso/:idCurso", cursoController.crearCurso)
router.post("/crearcurso", cursoController.crearCurso)
export default router