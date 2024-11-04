import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";

const router = Router()
const usuarioController = new UsuarioController()

router.post("/usuarionv", usuarioController.crearUsuarioNV)
router.post("/usuario", usuarioController.crearUsuario.bind(usuarioController))
router.post("/login", usuarioController.iniciarSesion)

router.get("/obtenerusuarios", usuarioController.obtenerUsuarios.bind(usuarioController))
router.get("/obtenerusuario", usuarioController.obtenerUsuario.bind(usuarioController))

router.put("/olvidecontrasena/email", usuarioController.olvideContraseñaEmail)
router.put("/olvidecontrasena/codigo", usuarioController.olvideContraseñaCodigo)
router.put("/olvidecontrasena/passowrd", usuarioController.olvideContraseñaPassword)
router.put("/reenviarcodigo/escuela", usuarioController.reenviarCodigoEscuela)
router.put("/reenviarcodigo/usuario", usuarioController.reenviarCodigoUsuario.bind(usuarioController))

export default router