import * as save from './save'
import * as deleteById from './deleteById'
import * as getByDate from './getByDate'
import * as getByTitle from './getByTitle'
import * as getById from './getById'

export const NotesController = {
  ...save,
  ...deleteById,
  ...getByDate,
  ...getByTitle,
  ...getById
}