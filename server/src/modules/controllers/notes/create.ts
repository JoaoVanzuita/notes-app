import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
import * as yup from 'yup'

interface ICreate {
  title: string
  description: string
}

export const createValidation = validation({
  body: yup.object().shape({
    title: yup.string().min(3).required(),
    description: yup.string().min(3).max(500).required()
  })
})
export const create = async (req: Request<{}, {}, ICreate>, res: Response) => {
  const data = req.body

  const user = req.user
  const actualDate = new Date().toLocaleDateString()

  const note = await NotesService.create(data.title, data.description, user, actualDate)

  res.json({
    'id': note.id
  })
}