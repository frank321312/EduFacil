import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers
        const listAuthorization = authorization.split(" ")
        const token = listAuthorization[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Token expirado", error: 1 })
        } else if (error.name === 'JsonWebTokenError') {
            res.status(400).json({ message: "Token invalido", error: 2 })
        } else {
            res.status(500).json({ message: "Error interno del servidor", error: 3 })
        }
    }
}

export const url = "https://edufacil.onrender.com"