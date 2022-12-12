import { Router } from 'express'
import { UserController } from './modules/controllers'

const routes = Router()

// routes.use(authMiddleware)

routes.get('/users', (req, res) => {
  res.send('Hello World')
})

routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.updateById)
routes.delete('/users/:id', UserController.deleteById)
routes.get('/users/:id', UserController.getLoggedIn)
routes.post('/users/:id', UserController.login)



export { routes }
