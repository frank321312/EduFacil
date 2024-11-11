import { Router } from "express";
import { TurnoController } from "../controllers/TurnoController.js";

const router = Router()
const turnoController = new TurnoController()

router.get("/turnos", turnoController.obtenerTurnos)

export default router