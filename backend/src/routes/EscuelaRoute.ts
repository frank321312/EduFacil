import { Router } from "express";
import { EscuelaController } from "../controllers/EscuelaController.js";

const router = Router()
const escuelaController = new EscuelaController()

router.get("/obtenerescuelas", escuelaController.obtenerEscuelas)
router.get("/escuela/:search", escuelaController.obtenerEscuela)
router.get("/escuela", escuelaController.obtenerEscuelaPorNombre.bind(escuelaController))

router.post("/escuelanv", escuelaController.crearEscuelaNV)
router.post("/escuela", escuelaController.crearEscuela.bind(escuelaController))

export default router