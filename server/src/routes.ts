import { Router } from 'express'
import { NotesController, UsersController } from './modules/controllers'
import { authMiddleware } from './modules/middleware'

const routes = Router()

routes.post('/login', UsersController.loginValidation, UsersController.login)
routes.post('/users', UsersController.createValidation, UsersController.create)

routes.use(authMiddleware)

routes.get('/users', UsersController.getLoggedIn)
routes.put('/users', UsersController.updateValidation, UsersController.updateById)
routes.delete('/users', UsersController.deleteById)

routes.post('/notes', NotesController.createValidation, NotesController.create)
routes.get('/notes', NotesController.getAllByUser)
routes.put('/notes/:id', NotesController.updateById)
routes.delete('/notes/:id', NotesController.deleteById)
routes.get('/notes/search', (req, res) =>
  req.query.title ? NotesController.getByTitle(req, res) : NotesController.getByDate(req, res))

export { routes }
