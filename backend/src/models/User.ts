import mongoose, { Schema, Document, Model } from 'mongoose'
import { IUser } from '../types/index'

// Combina o IUser com o document do mongoose
export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
    {
        name: {
            type: String,
            required: [true, 'Nome é obrigatório'],
            trim: true,
            minlength: [2, 'Nome deve ter no minimo 2 caracteres'],
            maxlength: [50, 'Nome deve ter no maximo 50 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'Email é obrigatorio'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Email inválido',
            ],
        },
        password: {
            type: String,
            required: [true, 'Senha é obrigatoria'],
            minlength: [6, 'Senha deve conter no minimo 6 caracteres'],
        },

        resetToken: {
            type: String,
            default: null,
        },
        resetTokenExpiry: {
            type: Date,
            default: null,
        },
},
{
  timestamps: true,  
}
)

const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema)

export default User