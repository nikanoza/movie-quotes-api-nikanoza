import { emailVerification, passwordRecovery, passwordRecoverySend, registration } from 'controllers'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/register', registration)
userRouter.post('/verify', emailVerification)
userRouter.post('/password/send-link', passwordRecoverySend)
userRouter.post('/password/recovery', passwordRecovery)

export default userRouter