import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
import * as yup from 'yup'

interface IDeleteParams {
  id?: number
}

export const deleteValidation = validation({
  params: yup.object().shape({
    id: yup.number().moreThan(0).required()
  })
})

export const deleteById = async (req: Request<IDeleteParams>, res: Response) => {
  const { id } = req.params
  const user = req.user

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const deletedId = await NotesService.deleteById(id!, user)

  res.json({
    'id': deletedId
  })
}