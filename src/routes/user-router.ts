import { 
    emailVerification, 
    loginWithEmail, 
    loginWithName, 
    passwordRecovery, 
    passwordRecoverySend, 
    registration,
    updateUser
} from 'controllers'
import express from 'express'
import { authMiddleware } from 'middlewares'

const userRouter = express.Router()

userRouter.post('/register', registration)
userRouter.post('/verify', emailVerification)
userRouter.post('/password/send-link', passwordRecoverySend)
userRouter.post('/password/recovery', passwordRecovery)
userRouter.post('/login/name', loginWithName)
userRouter.post('/login/email', loginWithEmail)
userRouter.put('/user-edit/:id', authMiddleware, updateUser )

export default userRouter