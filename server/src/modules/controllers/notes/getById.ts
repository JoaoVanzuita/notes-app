import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
import { Environment } from '../../environment'
import * as yup from 'yup'

interface IGetByIdParams {
  id?:string
}

export const getByIdValidation = validation({
  params: yup.object().shape({
    id: yup.string().uuid(Environment.INVALID_ID).required(Environment.REQUIRED_ID)
  })
})

export const getById = async (req: Request<IGetByIdParams>, res: Response) => {
  const user = req.user
  const { id } = req.params

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const note = await NotesService.getById(id!, user)

  return res.json({
    'note': note
  })
}