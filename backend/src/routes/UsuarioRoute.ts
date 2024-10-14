import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";

const router = Router()
const usuarioController = new UsuarioController()

router.post("/usuarionv", usuarioController.crearUsuarioNV)
router.post("/usuario", usuarioController.crearUsuario.bind(usuarioController))
router.post("/login", usuarioController.iniciarSesion)

router.get("/obtenerusuarios", usuarioController.obtenerUsuarios.bind(usuarioController))
router.get("/obtenerusuario", usuarioController.obtenerUsuario.bind(usuarioController))

export default router