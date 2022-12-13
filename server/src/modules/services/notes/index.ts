import * as create from './create'
import * as getAllByUser from './getAllByUser'
import * as updateById from './updateById'

export const NotesService = {
  ...create,
  ...getAllByUser,
  ...updateById
}