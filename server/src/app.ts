import cors from 'cors'
import express from 'express'
import { errorMiddleware } from './modules/middlewares'
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', routes)
// app.use('/', express.static('./public'))

// app.use(errorMiddleware)

export { app }
