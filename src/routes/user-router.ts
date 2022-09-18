import { emailVerification, registration } from 'controllers'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/register', registration)
userRouter.post('/verify', emailVerification)

export default userRouter