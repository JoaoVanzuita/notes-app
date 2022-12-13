import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './modules/middleware'
import { routes } from './routes'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('/api', routes)
// app.use('/', express.static('./public'))

app.use(errorMiddleware)

export { app }
