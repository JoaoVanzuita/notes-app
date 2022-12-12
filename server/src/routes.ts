import { Router } from 'express'
import { NoteController, UserController } from './modules/controllers'

const routes = Router()

routes.post('/users', UserController.create)
routes.post('/users/login', UserController.login)

// routes.use(authMiddleware)

routes.put('/users/:id', UserController.updateById)
routes.delete('/users/:id', UserController.deleteById)
routes.get('/users/:id', UserController.getLoggedIn)

routes.post('/notes', NoteController.create)
routes.get('/notes/user/:userId', NoteController.getAllByUser)
routes.put('/notes/:id', NoteController.updateById)
routes.delete('/notes/:id', NoteController.deleteById)
routes.get('/notes/user/:userId/search', (req, res) =>
  req.query.title ? NoteController.getByTitle(req, res) : NoteController.getByDate(req, res))

export { routes }
