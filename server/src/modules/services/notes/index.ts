import * as save from './save'
import * as deleteById from './deleteById'
import * as getByTitle from './getByTitle'
import * as getByDate from './getByDate'
import * as getById from './getById'

export const NotesService = {
  ...save,
  ...deleteById,
  ...getByTitle,
  ...getByDate,
  ...getById
}