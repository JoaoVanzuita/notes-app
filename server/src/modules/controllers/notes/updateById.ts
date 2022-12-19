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
    title: yup.string().min(3, 'O título deve ter no mínimo 3 caracteres').required('O título é obrigatório para atualizar a nota'),
    description: yup.string().min(3, 'A descrição deve ter no mínimo 3 caracteres').max(500, 'A descrição deve ter no máximo 3 caracteres').required('A descrição é obrigatória para atualizar a nota')
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