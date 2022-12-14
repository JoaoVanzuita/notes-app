import * as create from './create'
import * as getAllByUser from './getAllByUser'
import * as updateById from './updateById'
import * as deleteById from './deleteById'
import * as getByTitle from './getByTitle'

export const NotesService = {
  ...create,
  ...getAllByUser,
  ...updateById,
  ...deleteById,
  ...getByTitle
}