import { Router } from 'express'
import { register, login, getMe, forgotPassword, resetPassword } from '../controllers/authController'
import { authenticate } from '../middlewares/authMiddleware'
import { authLimiter } from "../middlewares/rateLimitMiddleware";

const router = Router()

router.post('/register',authLimiter, register)
router.post('/login',authLimiter, login)

router.get('/me', authenticate, getMe)

router.post('/forgot-password', authLimiter, forgotPassword)
router.post('/reset-password', authLimiter, resetPassword)

export default router