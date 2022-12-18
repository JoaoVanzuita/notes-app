import * as create from './create'
import * as updateById from './updateById'
import * as deleteById from './deleteById'
import * as getByTitle from './getByTitle'
import * as getByDate from './getByDate'

export const NotesService = {
  ...create,
  ...updateById,
  ...deleteById,
  ...getByTitle,
  ...getByDate
}