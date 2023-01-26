import { Module } from '@nestjs/common'

import { NotesController } from './notes/controllers/notes.controller'
import { UsersController } from './users/controllers/users.controller'

@Module({
  controllers: [UsersController, NotesController]
})
export class HttpModule { }
