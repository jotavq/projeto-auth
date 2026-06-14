import jwt, { SignOptions } from 'jsonwebtoken'
import { IJwtPayload } from '../types/index'
import { env } from '../config/env'


export const generateToken = (userId: string): string => {
    const options: SignOptions = {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn']
    }

    return jwt.sign(
        { id: userId } as IJwtPayload,
        env.JWT_SECRET,
        options
    )
}

export const verifyToken = (token: string): IJwtPayload => {
    const decoded = jwt.verify(token, env.JWT_SECRET)

    if(typeof decoded === 'string') {
        throw new Error('Token Inválido')
    }

    return decoded as IJwtPayload
}
