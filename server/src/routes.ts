import { Router } from 'express'
import { NotesController, UsersController } from './modules/controllers'
import { authMiddleware } from './modules/middleware'

const routes = Router()

routes.post('/login', UsersController.loginValidation, UsersController.login)
routes.post('/users', UsersController.createValidation, UsersController.create)

routes.use(authMiddleware)

routes.post('/logout', UsersController.logout)
routes.get('/users', UsersController.getLoggedIn)
routes.put('/users', UsersController.updateValidation, UsersController.updateById)
routes.delete('/users', UsersController.deleteById)

routes.post('/notes/:id', NotesController.saveValidation, NotesController.save)
routes.delete('/notes/:id', NotesController.deleteValidation, NotesController.deleteById)
routes.get('/notes/search', NotesController.getByTitleValidation, NotesController.getByTitle)
routes.get('/notes/date', NotesController.getByDateValidation, NotesController.getByDate)
routes.get('/notes/:id', NotesController.getByIdValidation, NotesController.getById)

export { routes }