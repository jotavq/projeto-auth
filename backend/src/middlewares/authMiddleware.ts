import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/tokenUtils'

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    try {
        const authHeader = req.headers['authorization']

        if (!authHeader) {
            res.status(401).json({ message: 'Token não fornecido' })
            return
        }

        const parts = authHeader.split(' ')

        if (parts.length !== 2 || parts[0] !== 'Bearer') { 
            res.status(401).json({ message: 'Formato do token invalido' })
            return
        }

        const token = parts[1]
        const decoded = verifyToken(token)

        req.userId = decoded.id

        next()

    } catch (err) {

        if (err instanceof Error && err.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token expirado, faça login novamente!' })
            return
        }
        res.status(401).json({ message: 'Token invalido' })
    }
}