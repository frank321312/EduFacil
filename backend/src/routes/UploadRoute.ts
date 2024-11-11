import { Request, Response, Router } from "express"
import multer from "multer"
import { join } from "path"
import fs from "fs";
import { verifyToken } from "../functions/verifyToken.js";
import { __dirname } from "../index.js";

const router = Router()

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, join(__dirname, "/uploads"))
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        fs.readdir(join(__dirname, "/uploads"), (err, archivos) => {
            if (err) {
                console.error("Error al leer el archivo", err)
            }
            const existeArchivo = archivos.find(archivo => archivo === file.originalname)
            if (existeArchivo) {
                return cb(new Error("El archivo ya existe"), "")
            } else {
                const nombreArchivo = `${Date.now()}-${file.originalname}`;
                req.body.nombreArchivo = nombreArchivo;
                cb(null, nombreArchivo);
            }
        })
    }
})

const upload = multer({
    storage: storage,
})

router.post("/upload", verifyToken, (req: Request, res: Response) => {
    upload.single("imagen")(req, res, (err: any) => {
        // console.log(req.file)
        if (err) {
            if (err.message === "El archivo ya existe") {
                return res.status(200).json({ message: "Imagen ya existente" })
            }
            return res.status(500).json({ message: "Error al subir el archivo" })
        }

        res.status(200).json({ archivo: req.body.nombreArchivo });
    });
})

export default router