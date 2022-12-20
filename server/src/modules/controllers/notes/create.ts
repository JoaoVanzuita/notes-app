import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
import { Environment } from '../../environment'
import * as yup from 'yup'

interface ICreate {
  title: string
  description: string
}

export const createValidation = validation({
  body: yup.object().shape({
    title: yup.string().max(100, Environment.TOO_LONG_TITLE).notRequired(),
    description: yup.string().max(500, Environment.TOO_LONG_DESC).notRequired()
  })
})

export const create = async (req: Request<{}, {}, ICreate>, res: Response) => {
  const data = req.body

  const user = req.user
  const actualDate = new Date()

  await NotesService.create(data.title, data.description, user, actualDate)

  res.status(204).send()
}