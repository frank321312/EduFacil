import { Router } from "express";
import { EscuelaController } from "../controllers/EscuelaController.js";
import { verifyToken } from "../functions/verifyToken.js";

const router = Router()
const escuelaController = new EscuelaController()

router.get("/obtenerescuelas", escuelaController.obtenerEscuelas)
router.get("/escuela/:search", escuelaController.obtenerEscuela)
router.get("/escuela", escuelaController.obtenerEscuelaPorNombre)
router.get("/escuela/id/:idEscuela", escuelaController.obtenerEscuelaPorId)

router.post("/escuelanv", escuelaController.crearEscuelaNV)
router.post("/escuela", escuelaController.crearEscuela.bind(escuelaController))

// Verifica que el token sea valido
router.put("/modificar/escuela", verifyToken, escuelaController.modificarDatos)

export default router