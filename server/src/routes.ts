import { Router } from 'express'
import { NotesController, UsersController } from './modules/controllers'

const routes = Router()

routes.post('/users/login', UsersController.login)

// routes.use(authMiddleware)

routes.post('/users', UsersController.createValidation, UsersController.create)
routes.put('/users/:id', UsersController.updateById)
routes.delete('/users/:id', UsersController.deleteById)
routes.get('/users', UsersController.getLoggedIn)

routes.post('/notes', NotesController.create)
routes.get('/notes/user/:userId', NotesController.getAllByUser)
routes.put('/notes/:id', NotesController.updateById)
routes.delete('/notes/:id', NotesController.deleteById)
routes.get('/notes/user/:userId/search', (req, res) =>
  req.query.title ? NotesController.getByTitle(req, res) : NotesController.getByDate(req, res))

export { routes }
