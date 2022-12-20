import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './modules/middleware'
import { routes } from './routes'
import path from 'path'

const app = express()

app.use('/', express.static(path.join(__dirname, '/public')))

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  credentials: true,
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  exposedHeaders: ['*', 'Authorization'],
  allowedHeaders: ['*', 'Authorization', 'Content-Type'],
}))

app.use('/api', routes)

app.use(errorMiddleware)

export { app }
