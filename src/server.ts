import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json()) 

app.listen(process.env.SERVER_PORT)