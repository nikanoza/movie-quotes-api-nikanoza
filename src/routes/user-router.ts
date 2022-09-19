import { emailVerification, loginWithEmail, loginWithName, passwordRecovery, passwordRecoverySend, registration } from 'controllers'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/register', registration)
userRouter.post('/verify', emailVerification)
userRouter.post('/password/send-link', passwordRecoverySend)
userRouter.post('/password/recovery', passwordRecovery)
userRouter.post('/login/name', loginWithName)
userRouter.post('/login/email', loginWithEmail)

export default userRouter