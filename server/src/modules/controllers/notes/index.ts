import { create } from './create'
import { updateById } from './updateById'
import { deleteById } from './deleteById'
import { getAllByUser } from './getAllByUser'
import { getByDate } from './getByDate'
import { getByTitle } from './getByTitle'

export const NotesController = {
  create,
  updateById,
  deleteById,
  getAllByUser,
  getByDate,
  getByTitle
}