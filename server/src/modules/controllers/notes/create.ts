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
    title: yup.string().notRequired(),
    description: yup.string().max(500).notRequired()
  })
})

export const create = async (req: Request<{}, {}, ICreate>, res: Response) => {
  const data = req.body

  const user = req.user
  const actualDate = new Date()

  const note = await NotesService.create(data.title, data.description, user, actualDate)

  res.json({
    'id': note.id
  })
}