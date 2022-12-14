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
routes.put('/notes/:id', NotesController.updateValidation, NotesController.updateById)
routes.delete('/notes/:id', NotesController.deleteValidation, NotesController.deleteById)
routes.get('/notes/title', NotesController.getByTitle)
routes.get('/notes/date', NotesController.getByDate)

export { routes }
