import { registration } from 'controllers'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/users/new', registration)

export default userRouter