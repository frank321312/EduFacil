import { Router } from "express";
import { HorarioController } from "../controllers/HorarioController.js";
import { verifyToken } from "../functions/verifyToken.js";

const router = Router()
const horarioController = new HorarioController()

router.post("/crear-horario", verifyToken, horarioController.crearHorario)
router.post("/editar-horario", verifyToken, horarioController.editarHorario)

router.get("/obtener-horario/:idCurso", horarioController.obtenerHorario)

router.delete("/eliminar-horario/:idCurso", verifyToken, horarioController.eliminarHorario)

export default router