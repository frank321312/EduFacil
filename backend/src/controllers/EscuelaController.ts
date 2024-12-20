import { Request, Response } from "express"
import { EscuelaType, insertarEscuela, insertarEscuelaNV, selectData } from "../functions/EscuelaFunc.js"
import { AppDataSource } from "../data-source.js"
import { Escuela } from "../entity/Escuela.js"
import { Like } from "typeorm"
import { validarTelefono, validarNombre, validarDireccion, existeTelefono } from "../validations/EscuelaValidation.js"
import { existeEmail, validarCorreo } from "../validations/UsuarioValidation.js"
import { existeNombre } from '../validations/EscuelaValidation.js'
import { generarNumeroCincoDigitos } from "../functions/UsuarioFunc.js"
import { EscuelaNoValidada } from "../entity/EscuelaNoValidada.js"
import { ValidationError } from "../errors/ValidationError.js"
import { UsuarioNoValidado } from "../entity/UsuarioNoValidado.js"
import { Rol } from "../entity/Rol.js"
import { obtenerEscuela } from "../functions/EscuelaFunc.js"
import { isNumber } from "../validations/CursoValidation.js"
import { Usuario } from "../entity/Usuario.js"

export class EscuelaController {
    async obtenerEscuelas(_req: Request, res: Response) {
        try {
            const escuelas = await AppDataSource.getRepository(Escuela).find({ select: selectData })
            res.json(escuelas)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudieron obtener las escuelas" })
        }
    }

    async obtenerEscuela(req: Request, res: Response) {
        try {
            const { search } = req.params
            const escuelas = await AppDataSource.getRepository(Escuela).find({ where: { nombre: Like(`%${search}%`) }, select: selectData })
            if (escuelas.length === 0) {
                res.status(404).json({ message: "Escuela no encontrada" })
            } else {
                res.json(escuelas)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudo obtener la escuela" })
        }
    }

    async crearEscuelaNV(req: Request, res: Response) {
        try {
            const { nombre, email, telefono, direccion } = req.body
            
            if (isNaN(Number(telefono))) {
                throw new TypeError("Telefono invalido")
            }
            validarNombre(nombre)
            validarCorreo(email)
            validarDireccion(direccion)
            validarTelefono(telefono)
            const responseExistsEmail = await Promise.all([existeEmail(EscuelaNoValidada, email),
            existeEmail(Escuela, email)
            ])
            const responseExistsName = await Promise.all([existeNombre(Escuela, nombre),
            existeNombre(Escuela, nombre)
            ])
            const responseUserExistsEmail = await Promise.all([existeEmail(UsuarioNoValidado, email),
            existeEmail(Usuario, email)
            ])
            const responseExistsPhone = await Promise.all([existeTelefono(EscuelaNoValidada, telefono), existeTelefono(Escuela, telefono)])

            if (responseExistsEmail.includes(true)) {
                throw new ValidationError("Ya existe una escuela con ese email", 28)
            }
            if (responseUserExistsEmail.includes(true)) {
                throw new ValidationError("Ya existe un usuario con ese email", 28)
            }
            if (responseExistsName.includes(true)) {
                throw new ValidationError("Ya existe una escuela con ese nombre", 29)
            }
            if (responseExistsPhone.includes(true)) {
                throw new ValidationError("Este telefono esta en uso", 30)
            }

            const codigo = generarNumeroCincoDigitos()
            const escuelaObj: EscuelaType = {
                ...req.body,
                codigo
            }
            const escuela = await insertarEscuelaNV(escuelaObj)
            res.json({ escuela })
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error, extra: error.extraError || 0 })
            } else if (error.name === "TypeError") {
                res.status(400).json({ message: error.message, numero: 44 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo crear la escuela", numero: 45 })
            }
        }
    }

    async crearEscuela(req: Request, res: Response) {
        try {
            const { idEscuelaNV, codigoEscuela, idUsuarioNV, codigo, idRol } = req.body
            const escuelaNV = await AppDataSource.getRepository(EscuelaNoValidada).findOneByOrFail({ idEscuelaNV })
            const usuarionv = await AppDataSource.getRepository(UsuarioNoValidado).findOneByOrFail({ idUsuarioNV })
            const rol = await AppDataSource.getRepository(Rol).findOneByOrFail({ idRol })
            // console.log(req.body);

            if (rol.idRol !== 1) {
                throw new ValidationError("No tiene permiso para crear una escuela", 50)
            }
            if (escuelaNV.codigo === codigoEscuela && usuarionv.codigo === codigo) {
                const escuelaObj: EscuelaType = {
                    ...escuelaNV,
                    imgUrl: "http://localhost:6008/get-imagen/et12de1_logo.jpg",
                    codigo: null
                }
                const escuela = await insertarEscuela(escuelaObj)
                // await AppDataSource.getRepository(EscuelaNoValidada).delete(escuelaNV)
                return res.json(escuela)
            } else {
                throw new ValidationError("Verifique el codigo de usuario o escuela", 46)
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "Registro no encontrado", numero: 47 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo crear la escuela", numero: 48 })
            }
        }
    }

    async obtenerEscuelaPorNombre(req: Request, res: Response) {
        try {
            const nombre = req.query.nombre as string
            const escuelas = await AppDataSource.getRepository(Escuela).find({ where: { nombre: Like(`%${nombre}%`) }, select: selectData })
            res.json(escuelas)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "No se pudo obtener la escuela", numero: 49 })
        }
    }

    async obtenerEscuelaPorId(req: Request, res: Response) {
        try {
            const { idEscuela } = req.params
            isNumber(idEscuela)
            const escuela = await AppDataSource.getRepository(Escuela).findOneOrFail({ where: { idEscuela: Number(idEscuela) }, select: selectData })
            res.json(escuela)
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: 47 })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "No se pudo obtener los datos de la escuela", numero: 47 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo obtener la escuela", numero: 48 })
            }
        }
    }

    async modificarDatos(req: Request, res: Response) {
        try {
            const { idEscuela, nombre, email, telefono, direccion, imgUrl } = req.body
            const respositoryEscuela = AppDataSource.getRepository(Escuela)
            const escuela = await respositoryEscuela.findOneByOrFail({ idEscuela })
            validarNombre(nombre)
            validarCorreo(email)
            validarDireccion(direccion)
            validarTelefono(telefono)
            const responseExistsEmail = await Promise.all([existeEmail(EscuelaNoValidada, email),
            existeEmail(Escuela, email)
            ])
            const responseExistsName = await Promise.all([existeNombre(Escuela, nombre),
            existeNombre(Escuela, nombre)
            ])
            const responseUserExistsEmail = await Promise.all([existeEmail(UsuarioNoValidado, email),
            existeEmail(Usuario, email)
            ])
            const responseExistsPhone = await Promise.all([existeTelefono(EscuelaNoValidada, telefono), existeTelefono(Escuela, telefono)])

            if (responseExistsEmail.includes(true) && escuela.email != email) {
                throw new ValidationError("Ya existe una escuela con ese email", 28)
            }
            if (responseUserExistsEmail.includes(true)) {
                throw new ValidationError("Ya existe un usuario con ese email", 28)
            }
            if (responseExistsName.includes(true) && escuela.nombre != nombre) {
                throw new ValidationError("Ya existe una escuela con ese nombre", 29)
            }
            if (responseExistsPhone.includes(true) && escuela.telefono != telefono) {
                throw new ValidationError("Este telefono esta en uso", 30)
            }
            respositoryEscuela.merge(escuela, { nombre, email, telefono, direccion, imgUrl: imgUrl !== undefined ? imgUrl : escuela.imgUrl })
            respositoryEscuela.save(escuela)
            res.status(204).send()
        } catch (error) {
            if (error.name === "ValidationError") {
                res.status(400).json({ message: error.message, numero: error.error })
            } else if (error.name === "EntityNotFoundError") {
                res.status(404).json({ message: "No se pudo guardar los datos de la escuela", numero: 47 })
            } else {
                console.log(error)
                res.status(500).json({ message: "No se pudo obtener la escuela", numero: 48 })
            }
        }
    }
}