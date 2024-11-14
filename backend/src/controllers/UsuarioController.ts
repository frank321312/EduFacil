import e, { Request, Response } from "express";
import { existeNombre, existeEmail, validarApellido, validarCorreo, validarNombre, validarNombreUsuario, validarPassowrd } from "../validations/UsuarioValidation.js";
import { obtenerEscuela } from "../functions/EscuelaFunc.js";
import { AppDataSource } from "../data-source.js";
import { UsuarioNoValidado } from "../entity/UsuarioNoValidado.js";
import { Rol } from "../entity/Rol.js";
import { isNumber } from "../validations/CursoValidation.js";
import { generarNumeroCincoDigitos, getUser, insertarUsuario, insertarUsuarioNV, obtenerDatoUsuarioAuth, UsuarioType } from "../functions/UsuarioFunc.js";
import { Usuario } from "../entity/Usuario.js";
import { ValidationError } from "../errors/ValidationError.js";
import jwt from 'jsonwebtoken';
import { Like } from "typeorm";
import { EscuelaNoValidada } from "../entity/EscuelaNoValidada.js";
import { Escuela } from "../entity/Escuela.js";
import { nodemailerArchivoImg, nodemailerArchivoPdf, nodemailerArchivoPng, nodemailerCode } from "../nodemailer/nodemailer.js";

export class UsuarioController {
    async crearUsuarioNV(req: Request, res: Response) {
        try {
            const { nombreUsuario, nombre, apellido, email, password, idEscuela, idRol } = req.body
            if (typeof idRol === "object") {
                isNumber(idRol.idRol)
            } else {
                isNumber(idRol)
            }
            isNumber(idEscuela)
            validarNombreUsuario(nombreUsuario)
            validarNombre(nombre)
            validarApellido(apellido)
            validarCorreo(email)
            validarPassowrd(password)
            const responseUserExistsEmail = await Promise.all([existeEmail(UsuarioNoValidado, email),
            existeEmail(Usuario, email)
            ])
            const responseUserExistsUsername = await Promise.all([existeNombre(UsuarioNoValidado, nombreUsuario),
            existeNombre(Usuario, nombreUsuario)
            ])
            if (responseUserExistsEmail.includes(true)) {
                throw new ValidationError("Ya existe un usuario con ese email", 28)
            }
            if (responseUserExistsUsername.includes(true)) {
                throw new ValidationError("Ya existe un usuario con ese nombre", 29)
            }

            const rol = await AppDataSource.getRepository(Rol).findOneByOrFail({ idRol })
            if (rol.idRol === 2 || rol.idRol === 3) {
                // Verifico que la escuela exista solo para el estudiante y docente, 
                // pero para la escuela no ya que se registra al mismo tiempo que el administrador de dicha escuela
                await obtenerEscuela(idEscuela)
            }
            if (rol.idRol === 1) {
                // Usar nodemailer para enviar el codigo a la escuela, al daministrador fuera del if
                const escuela = await AppDataSource.getRepository(EscuelaNoValidada).findOneByOrFail({ idEscuelaNV: idEscuela })
                await nodemailerCode(escuela.email, Number(escuela.codigo))
            }
            // Usar nodemailer para enviar el codigo de validacion al usuario sin importar su rol
            const codigoValidacion = generarNumeroCincoDigitos()
            const userType: UsuarioType = { ...req.body, codigo: codigoValidacion }
            const idUsuarioNV = await insertarUsuarioNV(userType, idRol, idEscuela)
            await nodemailerCode(email, codigoValidacion)

            res.status(200).json({ idUsuarionv: idUsuarioNV })
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Escuela no encontrada", numero: 25 })
            } else if (error.name === "TypeError") {
                res.status(400).json({ message: error.message, numero: 26 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo crear el usuario", numero: 27 })
            }
        }
    }

    async crearUsuario(req: Request, res: Response) {
        try {
            const { codigo, codigoEscuela, idUsuarioNV, usuario, idEscuela, idEscuelaNV } = req.body
            // Verifico que el usuario exista, en caso contrario lanza una excepcion
            const user = await AppDataSource.getRepository(UsuarioNoValidado).findOneByOrFail({ idUsuarioNV, email: usuario.email, nombreUsuario: usuario.nombreUsuario })
            const rol = await AppDataSource.getRepository(Rol).findOneByOrFail({ idRol: user.idRol })
            if (rol.idRol === 3) {
                const escuela = await obtenerEscuela(idEscuela)
                if (escuela.codigo === codigoEscuela && user.codigo === codigo) {
                    const userType: UsuarioType = { ...user, codigo: null }
                    const usuarioAuthLogin = await insertarUsuario(userType, rol, escuela)
                    await AppDataSource.getRepository(UsuarioNoValidado).delete(user)
                    const token = jwt.sign({ ...usuarioAuthLogin }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 30 })
                    return res.status(200).json(token)
                } else {
                    throw new ValidationError("Verifique el codigo de usuario o escuela", 28)
                }
            } else if (rol.idRol === 1) {
                const escuelaNV = await AppDataSource.getRepository(EscuelaNoValidada).findOneByOrFail({ idEscuelaNV })
                const escuela = await obtenerEscuela(idEscuela)
                if (user.codigo === codigo) {
                    const userType: UsuarioType = { ...user, codigo: null }
                    const usuarioAuthLogin = await insertarUsuario(userType, rol, escuela)
                    await AppDataSource.getRepository(UsuarioNoValidado).delete(user)
                    // Si el registro fue exitoso, se crea un token para el usuario, expira en 30 minutos
                    const token = jwt.sign({ ...usuarioAuthLogin }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 30 })
                    await AppDataSource.getRepository(EscuelaNoValidada).delete({ idEscuelaNV: escuelaNV.idEscuelaNV })
                    return res.status(200).json(token)
                } else {
                    throw new ValidationError("Verifique el codigo de usuario o escuela", 28)
                }
            } else {
                const escuela = await obtenerEscuela(idEscuela)
                if (user.codigo === codigo) {
                    const userType: UsuarioType = { ...user, codigo: null }
                    const usuarioAuthLogin = await insertarUsuario(userType, rol, escuela)
                    await AppDataSource.getRepository(UsuarioNoValidado).delete(user)
                    const token = jwt.sign({ ...usuarioAuthLogin }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 30 })
                    res.status(200).json(token)
                } else {
                    throw new ValidationError("Codigo invalido", 28)
                }
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Registro no encontrado", numero: 29 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo crear el usuario", numero: 30 })
            }
        }
    }

    async iniciarSesion(req: Request, res: Response) {
        try {
            const { emailUsername, password } = req.body
            const userExists = await AppDataSource.getRepository(Usuario).findOneOrFail({ where: [{ email: emailUsername }, { nombreUsuario: emailUsername }] })
            if (userExists.password !== password) throw new ValidationError("Contraseña invalida", 31)
            const usuario = await obtenerDatoUsuarioAuth(userExists.idUsuario)
            const token = jwt.sign({ ...usuario }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 })
            res.json(token)
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "El usuario no existe", numero: 32 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo iniciar sesion", numero: 33 })
            }
        }
    }

    async obtenerUsuarios(req: Request, res: Response) {
        try {
            const { idEscuela } = req.params
            if (isNaN(Number(idEscuela))) {
                throw new TypeError("Id invalido")
            }
            const usuarios = await AppDataSource.getRepository(Usuario).find(
                {
                    where: { escuela: { idEscuela: Number(idEscuela) }, rol: [{ idRol: 2 }, { idRol: 3 }] },
                    relations: { escuela: true },
                    select: { idUsuario: true, nombreUsuario: true, nombre: true, apellido: true, email: true, fechaIngreso: true, escuela: { idEscuela: true } }
                }
            )
            res.json(usuarios)
        } catch (error) {
            if (error.name === "TypeError") {
                res.status(400).json({ message: error.message, numero: 34 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudieron obtener los usuarios", numero: 35 })
            }
        }
    }

    async obtenerUsuario(req: Request, res: Response) {
        try {
            const username = req.query.username as string
            const id = req.query.escuela

            if (isNaN(Number(id))) {
                throw new TypeError("Id invalido")
            }
            await obtenerEscuela(Number(id))
            const usuarios = await AppDataSource.getRepository(Usuario)
                .find({
                    where: [
                        { nombreUsuario: Like(`%${username}%`), escuela: { idEscuela: Number(id) } },
                        { nombre: Like(`%${username}%`), escuela: { idEscuela: Number(id) } },
                        { apellido: Like(`%${username}%`), escuela: { idEscuela: Number(id) } }
                    ],
                    relations: { escuela: true },
                    select: { idUsuario: true, nombre: true, apellido: true, email: true, fechaIngreso: true, escuela: { idEscuela: true } }
                })

            res.json(usuarios)
        } catch (error) {
            if (error.name === "TypeError") {
                res.status(400).json({ message: error.message, numero: 36 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudieron obtener los usuarios", numero: 37 })
            }
        }
    }

    async buscarUsuario(req: Request, res: Response) {
        try {
            const username = req.query.username as string
            const id = req.query.escuela

            const [nombre, apellido, email] = username.split(" ")
            if (isNaN(Number(id))) {
                throw new TypeError("Id invalido")
            }
            await obtenerEscuela(Number(id))
            const criterios: any = {}
            if (nombre) criterios.nombre = Like(`%${nombre}%`)
            if (apellido) criterios.apellido = Like(`%${apellido}%`)
            if (email) criterios.email = Like(`%${email}%`)
            
            const escuela = await AppDataSource.getRepository(Escuela).findOneByOrFail({ idEscuela: Number(id) })
            const usuarios = await AppDataSource.getRepository(Usuario).find({ where: { ...criterios, escuela } })
            res.json(usuarios)
        } catch (error) {
            if (error.name === "TypeError") {
                res.status(400).json({ message: error.message, numero: 36 })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Usuario no encontrado", numero: 32 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudieron obtener los usuarios", numero: 37 })
            }
        }
    }

    async olvideContraseñaEmail(req: Request, res: Response) {
        try {
            const { email } = req.body
            validarCorreo(email)
            const codigo = generarNumeroCincoDigitos()
            const respositoryUsuario = AppDataSource.getRepository(Usuario)
            const usuario = await respositoryUsuario.findOneByOrFail({ email })
            respositoryUsuario.merge(usuario, { codigo: codigo.toString() })
            await respositoryUsuario.save(usuario)

            // Usar nodemailer para enviar en codigo de verificacion para el usuario
            await nodemailerCode(email, codigo)

            res.status(204).send()
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "El usuario no existe", numero: 32 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo mandar el email", numero: 37 })
            }
        }
    }

    async olvideContraseñaCodigo(req: Request, res: Response) {
        try {
            const { codigo, email } = req.body
            const usuario = await AppDataSource.getRepository(Usuario).findOneByOrFail({ email })
            if (usuario.codigo != codigo) {
                throw new ValidationError("Codigo invalido", 67)
            }
            res.status(200).json(usuario.idUsuario)
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "El usuario no existe", numero: 32 })
            } else {
                console.log(error)
                res.status(500).json({ message: "Error interno del servidor", numero: 37 })
            }
        }
    }

    async olvideContraseñaPassword(req: Request, res: Response) {
        try {
            const { idUsuario, password, codigo } = req.body
            validarPassowrd(password)
            const repositoryUsuario = AppDataSource.getRepository(Usuario)
            const usuario = await repositoryUsuario.findOneByOrFail({ idUsuario })
            if (usuario.codigo != codigo) {
                throw new ValidationError("Codigo invalido", 67)
            }
            repositoryUsuario.merge(usuario, { password })
            await repositoryUsuario.save(usuario);
            res.status(204).send()
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "El usuario no existe", numero: 32 })
            } else {
                console.log(error)
                res.status(500).json({ message: "Error interno del servidor", numero: 37 })
            }
        }
    }

    async reenviarCodigoEscuela(req: Request, res: Response) {
        try {
            const { idEscuelaNV } = req.body
            const codigo = generarNumeroCincoDigitos()
            const repositoryEscuelaNV = AppDataSource.getRepository(EscuelaNoValidada)
            const escuelaNV = await repositoryEscuelaNV.findOneByOrFail({ idEscuelaNV })
            repositoryEscuelaNV.merge(escuelaNV, { codigo: codigo.toString() })
            await repositoryEscuelaNV.save(escuelaNV)

            // Usar nodemailer para reenviar el codigo a la escuela
            await nodemailerCode(escuelaNV.email, codigo)

            res.status(204).send()
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "No se pudo reenviar el codigo", numero: 32 })
            } else {
                console.log(error)
                res.status(500).json({ message: "Error interno del servidor", numero: 37 })
            }
        }
    }

    async reenviarCodigoUsuario(req: Request, res: Response) {
        try {
            const { email, isUserNV } = req.body
            console.log(req.body)
            if (isUserNV == true) {
                const repositoryUsuarioNV = AppDataSource.getRepository(UsuarioNoValidado)
                const usuarioNV = await repositoryUsuarioNV.findOneByOrFail({ email })
                const codigo = generarNumeroCincoDigitos()
                repositoryUsuarioNV.merge(usuarioNV, { codigo: codigo.toString() })
                await repositoryUsuarioNV.save(usuarioNV)
                // Usar nodemailer para reenviar el codigo
                await nodemailerCode(usuarioNV.email, codigo)

                return res.status(204).send()
            } else {
                const repositoryUsuario = AppDataSource.getRepository(Usuario)
                const usuario = await repositoryUsuario.findOneByOrFail({ email })
                const codigo = generarNumeroCincoDigitos()
                repositoryUsuario.merge(usuario, { codigo: codigo.toString() })
                await repositoryUsuario.save(usuario)
                // Usar nodemailer para reenviar el codigo
                await nodemailerCode(usuario.email, codigo)

                return res.status(204).send()
            }
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "No se pudo reenviar el codigo", numero: 32 })
            } else {
                console.log(error)
                res.status(500).json({ message: "Error interno del servidor", numero: 37 })
            }
        }
    }

    async modificarDatos(req: Request, res: Response) {
        try {
            const { nombreUsuario, nombre, apellido, email, password, idUsuario } = req.body
            const repositoryUsuario = AppDataSource.getRepository(Usuario)
            const usuario = await repositoryUsuario.findOneBy({ idUsuario })
            const responseUserExistsEmail = await Promise.all([existeEmail(UsuarioNoValidado, email),
            existeEmail(Usuario, email)
            ])
            const responseUserExistsUsername = await Promise.all([existeNombre(UsuarioNoValidado, nombreUsuario),
            existeNombre(Usuario, nombreUsuario)
            ])
            const responseExistsEmail = await Promise.all([existeEmail(EscuelaNoValidada, email),
            existeEmail(Escuela, email)
            ])
            if (responseUserExistsEmail.includes(true) && usuario.email !== email) {
                throw new ValidationError("Ya existe un usuario con ese email", 28)
            }
            if (responseUserExistsUsername.includes(true) && usuario.nombreUsuario !== nombreUsuario) {
                throw new ValidationError("Ya existe un usuario con ese nombre", 29)
            }
            if (responseExistsEmail.includes(true)) {
                throw new ValidationError("Ya existe una escuela con ese email", 28)
            }
            validarNombreUsuario(nombreUsuario)
            validarNombre(nombre)
            validarApellido(apellido)
            validarCorreo(email)
            validarPassowrd(password)
            AppDataSource.getRepository(Usuario).merge(usuario, { nombreUsuario, nombre, apellido, email, password })
            await repositoryUsuario.save(usuario)
            res.status(204).send()
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo guardar los cambios", numero: 50 })
            }
        }
    }

    async obtenerDatosId(req: Request, res: Response) {
        try {
            const { idUsuario } = req.params
            const usuario = await AppDataSource.getRepository(Usuario).findOneOrFail({ where: { idUsuario: Number(idUsuario) }, select: { nombreUsuario: true, nombre: true, apellido: true, email: true, password: true } })
            res.json(usuario)
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "No se encontro al usuario", numero: 32 })
            } else {
                console.log(error)
                res.status(500).json({ message: "Error interno del servidor", numero: 37 })
            }
        }
    }

    async validarCampos(req: Request, res: Response) {
        try {
            const { asunto, contenido, idUsuarioEmisor, idUsuarioReceptor } = req.body
            if (!asunto) {
                throw new ValidationError("El asunto no puede estar vacio", 40)
            } else if (asunto.length > 255) {
                throw new ValidationError("El asunto debe ser corto y conciso, 255 caracteres", 40)
            }
            if (!contenido) {
                throw new ValidationError("El contenido no puede estar vacio", 41)
            } else if (asunto.length > 500) {
                throw new ValidationError("El contenido debe ser menor a 500 caracteres", 41)
            }
            const usuarioRepository = AppDataSource.getRepository(Usuario)
            await usuarioRepository.findOneByOrFail({ idUsuario: Number(idUsuarioEmisor) })
            await usuarioRepository.findOneByOrFail({ idUsuario: Number(idUsuarioReceptor) })

            res.status(204).send()
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "No se encontro al usuario", numero: 32 })
            } else if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else {
                console.log(error)
                res.status(500).json({ message: "Error interno del servidor", numero: 37 })
            }
        }
    }

    async enviarArchivo(req: Request, res: Response) {
        try {
            const { asunto, contenido, archivo, idUsuarioEmisor, idUsuarioReceptor } = req.body
            console.log(req.body)
            if (!asunto) {
                throw new ValidationError("El asunto no puede estar vacio", 40)
            } else if (asunto.length > 255) {
                throw new ValidationError("El asunto debe ser corto y conciso, 255 caracteres", 40)
            }
            if (!contenido) {
                throw new ValidationError("El contenido no puede estar vacio", 41)
            } else if (asunto.length > 500) {
                throw new ValidationError("El contenido debe ser menor a 500 caracteres", 41)
            }
            if (!archivo.length) {
                throw new ValidationError("Archivo invalido", 42)
            }
            const usuarioRepository = AppDataSource.getRepository(Usuario)
            await usuarioRepository.findOneByOrFail({ idUsuario: Number(idUsuarioEmisor) })
            const usuarioRe = await usuarioRepository.findOneByOrFail({ idUsuario: Number(idUsuarioReceptor) })
            const formato = archivo.split(".")
            if (formato[formato.length - 1] == "jpg") {
                await nodemailerArchivoImg(usuarioRe.email, asunto, contenido, archivo)
            } else if (formato[formato.length - 1] == "png") {
                console.log("png")
                await nodemailerArchivoPng(usuarioRe.email, asunto, contenido, archivo)
            } else if (formato[formato.length - 1] == "pdf") {
                console.log("Sappe")
                await nodemailerArchivoPdf(usuarioRe.email, asunto, contenido, archivo)
            } else {
                throw new ValidationError("Tipo de archivo invalido", 37)
            }
            res.status(204).send()
        } catch (error) {
            if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "No se encontro al usuario", numero: 32 })
            } else if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else {
                console.log(error)
                res.status(500).json({ message: "Error interno del servidor", numero: 37 })
            }
        }
    }
}