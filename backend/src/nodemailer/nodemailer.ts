import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rutaDirectorio = __dirname.split("\\")
rutaDirectorio.pop()
const ruta = rutaDirectorio.join("/")

dotenv.config()
export const nodemailerCode = async (Email: string, Codigo: number | undefined) => {
    const traportar = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: 'hectorsacaca1123@gmail.com',
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
            accessToken: process.env.EMAIL_ACCESS_TOKEN
        }
    });

    var mailOptions = {
        from: "hectorsacaca1123@gmail.com",
        to: Email,
        subject: "Codigo de verificación",
        text: `${Codigo}`
    };

    try {
        const info = await traportar.sendMail(mailOptions);
        return `Envio con exito: ${info.response}`;
    } catch (error) {
        console.error("Error, no se pudo enviar el email:", error);
    }
}

export const nodemailerArchivoPdf = async (email: string, asunto: string, texto: string, archivo: string) => {
    const traportar = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: 'hectorsacaca1123@gmail.com',
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
            accessToken: process.env.EMAIL_ACCESS_TOKEN
        }
    });

    try {
        const info = await traportar.sendMail({
            from: "hectorsacaca1123@gmail.com",
            to: email,
            subject: `${asunto}`,
            text: `${texto}`,
            attachments: [
                {
                    filename: "archivo.pdf",
                    path: path.join(`${ruta}/uploads`, archivo),
                }
            ]
        });
        return `Envio con exito: ${info.response}`;
    } catch (error) {
        console.error("Error, no se pudo enviar el email:", error);
    }
}

export const nodemailerArchivoImg = async (email: string, asunto: string, texto: string, archivo: string) => {
    const traportar = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: 'hectorsacaca1123@gmail.com',
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
            accessToken: process.env.EMAIL_ACCESS_TOKEN
        }
    });

    try {
        const info = await traportar.sendMail({
            from: "hectorsacaca1123@gmail.com",
            to: email,
            subject: `${asunto}`,
            text: `${texto}`,
            attachments: [
                {
                    filename: "image.jpg",
                    path: path.join(`${ruta}/uploads`, archivo),
                }
            ]
        });
        return `Envio con exito: ${info.response}`;
    } catch (error) {
        console.error("Error, no se pudo enviar el email:", error);
    }
}

export const nodemailerArchivoPng = async (email: string, asunto: string, texto: string, archivo: string) => {
    const traportar = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: 'hectorsacaca1123@gmail.com',
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN,
            accessToken: process.env.EMAIL_ACCESS_TOKEN
        }
    });

    try {
        const info = await traportar.sendMail({
            from: "hectorsacaca1123@gmail.com",
            to: email,
            subject: `${asunto}`,
            text: `${texto}`,
            attachments: [
                {
                    filename: "image.png",
                    path: path.join(`${ruta}/uploads`, archivo),
                }
            ]
        });
        return `Envio con exito: ${info.response}`;
    } catch (error) {
        console.error("Error, no se pudo enviar el email:", error);
    }
}

// function buscarArchivoEnDirectorio(directorio: string, nombreArchivo: string): Promise<string | null> {
//     return new Promise((resolve, reject) => {
//         fs.readdir(directorio, (err, archivos) => {
//             if (err) {
//                 reject('Error al leer el directorio: ' + err);
//             }

//             const archivoEncontrado = archivos.find(archivo => archivo === nombreArchivo);
//             if (archivoEncontrado) {
//                 resolve(path.join(directorio, archivoEncontrado)); // Devolver la ruta completa del archivo encontrado
//             } else {
//                 resolve(null); // Si no se encuentra el archivo
//             }
//         });
//     });
// }

// async function buscarArchivo() {
//     const rutaArchivo = await buscarArchivoEnDirectorio(`${ruta}/uploads`, 'et12de1_logo.jpg');
//     if (rutaArchivo) {
//         return rutaArchivo
//     } else {
//         console.log('Archivo no encontrado.');
//     }
// }

// const archivo = await buscarArchivo()

// nodemailerArchivo("davidbzk95@gmail.com", "asuntos", "Textual", archivo)