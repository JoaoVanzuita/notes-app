import * as create from './create'
import * as getAllByUser from './getAllByUser'
import * as updateById from './updateById'
import * as deleteById from './deleteById'

export const NotesService = {
  ...create,
  ...getAllByUser,
  ...updateById,
  ...deleteById
}