import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
import { Environment } from '../../environment'
import * as yup from 'yup'

interface IDeleteParams {
  id?: string
}

export const deleteValidation = validation({
  params: yup.object().shape({
    id: yup.string().uuid().required(Environment.REQUIRED_ID)
  })
})

export const deleteById = async (req: Request<IDeleteParams>, res: Response) => {
  const { id } = req.params
  const user = req.user

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await NotesService.deleteById(id!, user)

  return res.status(204).send()
}