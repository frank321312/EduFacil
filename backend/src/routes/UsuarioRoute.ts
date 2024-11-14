import { NextFunction, Request, Response, Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";
import { verifyToken } from "../functions/verifyToken.js";

const router = Router()
const usuarioController = new UsuarioController()

router.post("/usuarionv", usuarioController.crearUsuarioNV)
router.post("/usuario", usuarioController.crearUsuario.bind(usuarioController))
router.post("/login", usuarioController.iniciarSesion)

// Obtiene todos los usuarios de una escuela en base a su id
router.get("/obtenerusuarios/:idEscuela", usuarioController.obtenerUsuarios)
router.get("/obtenerusuario", usuarioController.obtenerUsuario.bind(usuarioController))
router.get("/buscar-usuario", usuarioController.buscarUsuario)

router.put("/olvidecontrasena/email", usuarioController.olvideContraseñaEmail)
router.put("/olvidecontrasena/codigo", usuarioController.olvideContraseñaCodigo)
router.put("/olvidecontrasena/passowrd", usuarioController.olvideContraseñaPassword)
router.put("/reenviarcodigo/escuela", usuarioController.reenviarCodigoEscuela)
router.put("/reenviarcodigo/usuario", usuarioController.reenviarCodigoUsuario.bind(usuarioController))

// Rutas que necesitan el token
router.get("/obtenerdatos/:idUsuario", verifyToken, usuarioController.obtenerDatosId)

router.put("/editar", verifyToken, usuarioController.modificarDatos)

router.post("/validar-datos", verifyToken, usuarioController.validarCampos)
router.post("/enviar-archivo", verifyToken, usuarioController.enviarArchivo)

export default router