import { Router } from "express";
import { HorarioController } from "../controllers/HorarioController.js";
import { verifyToken } from "../functions/verifyToken.js";

const router = Router()
const horarioController = new HorarioController()

router.post("/crear-horario", verifyToken, horarioController.crearHorario)
router.post("/editar-horario", verifyToken, horarioController.editarHorario)
router.get("/obtener-horario/:idCurso", horarioController.obtenerHorario)

export default router