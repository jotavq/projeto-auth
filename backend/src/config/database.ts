import mongoose from 'mongoose'
import { env } from './env'

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(env.MONGODB_URI)
        console.log(`MongoDB conectado: ${conn.connection.host}`)
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro desconhecido'
        console.error(`Erro na conexão: ${message}`)
        process.exit(1)
    }
}

export default connectDB