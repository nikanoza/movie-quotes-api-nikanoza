import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import connectToMongo from './config/mongo.js'
import { swaggerMiddleware } from 'middlewares'
import { userRouter } from 'routes'

const app = express()
dotenv.config()
connectToMongo()

app.use(bodyParser.json()) 

app.use('/api', cors(), userRouter)
app.use('/', ...swaggerMiddleware)

app.listen(process.env.SERVER_PORT)