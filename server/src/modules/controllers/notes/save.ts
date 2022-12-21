import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
import { Environment } from '../../environment'
import * as yup from 'yup'

interface ISaveBody {
  title: string
  description: string
}

interface ISaveParams {
  id?: string
}

export const saveValidation = validation({
  params: yup.object().shape({
    id: yup.string().uuid(Environment.INVALID_ID).required()
  }),
  body: yup.object().shape({
    title: yup.string().min(3, Environment.TOO_SHORT_TITLE).max(100, Environment.TOO_LONG_TITLE).required(Environment.REQUIRED_TITLE),
    description: yup.string().min(3, Environment.TOO_SHORT_DESC).max(500, Environment.TOO_SHORT_DESC).required(Environment.REQUIRED_DESC)
  })
})

export const save = async (req: Request<ISaveParams, {}, ISaveBody>, res: Response) => {

  const id = req.params.id
  const data = req.body
  const user = req.user
  const actualDate = new Date()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await NotesService.save(id!, data.title, data.description, user, actualDate)

  return res.status(204).send()
}