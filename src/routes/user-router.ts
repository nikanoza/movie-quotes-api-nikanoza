import { registration } from 'controllers'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/register', registration)

export default userRouter