import * as create from './create'
import * as deleteById from './deleteById'
import * as updateById from './updateById'
import * as getByTitle from './getByTitle'
import * as getByDate from './getByDate'

export const NotesService = {
  ...create,
  ...deleteById,
  ...updateById,
  ...getByTitle,
  ...getByDate
}