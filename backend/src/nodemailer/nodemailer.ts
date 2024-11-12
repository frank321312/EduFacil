import nodemailer from "nodemailer";
import dotenv from "dotenv";

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
};