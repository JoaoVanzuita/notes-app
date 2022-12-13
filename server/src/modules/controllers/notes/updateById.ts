import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
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
    id: yup.number().moreThan(0).required()
  }),
  body: yup.object().shape({
    title: yup.string().min(3).required(),
    description: yup.string().min(3).max(500).required()
  })
})

export const updateById = async (req: Request<IUpdateParams, {}, IUpdateBody>, res: Response) => {
  const id  = Number(req.params.id)
  const data = req.body
  const user = req.user
  const actualDate = new Date()

  const note = await NotesService.updateById(id, data.title, data.description, user, actualDate)

  return res.json({
    'id': note.id})
}