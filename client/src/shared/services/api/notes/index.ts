import * as deleteById from './deleteById'
import * as save from './save'
import * as getByTitle from './getByTitle'
import * as getByDate from './getByDate'
import * as getById from './getById'

export const NotesService = {
  ...deleteById,
  ...save,
  ...getByTitle,
  ...getByDate,
  ...getById
}