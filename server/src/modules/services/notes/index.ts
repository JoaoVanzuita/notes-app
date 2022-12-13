import * as create from './create'
import * as getAllByUser from './getAllByUser'

export const NotesService = {
  ...create,
  ...getAllByUser
}