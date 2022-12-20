import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
import { Environment } from '../../environment'
import * as yup from 'yup'

interface IUpdateBody {
  title: string
  description: string
}

interface IUpdateParams {
  id?: number
}

export const updateValidation = validation({
  params: yup.object().shape({
    id: yup.number().moreThan(0, Environment.INVALID_ID).required()
  }),
  body: yup.object().shape({
    title: yup.string().min(3, Environment.TOO_SHORT_TITLE).max(100, Environment.TOO_LONG_TITLE).required(Environment.REQUIRED_TITLE),
    description: yup.string().min(3, Environment.TOO_SHORT_DESC).max(500, Environment.TOO_SHORT_DESC).required(Environment.REQUIRED_DESC)
  })
})

export const updateById = async (req: Request<IUpdateParams, {}, IUpdateBody>, res: Response) => {
  const id  = Number(req.params.id)
  const data = req.body
  const user = req.user
  const actualDate = new Date()

  await NotesService.updateById(id, data.title, data.description, user, actualDate)

  return res.status(204).send()
}