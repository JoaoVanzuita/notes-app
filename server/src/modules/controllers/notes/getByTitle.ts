import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
import * as yup from 'yup'

interface IGetByTitleQuery {
  title?:string
}

export const getByTitleValidation = validation({
  query: yup.object().shape({
    title: yup.string().notRequired()
  })
})

export const getByTitle = async (req: Request<{}, {}, {}, IGetByTitleQuery>, res: Response) => {
  const user = req.user
  const { title } = req.query

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const notes = await NotesService.getByTitle(title!, user)

  return res.json({
    'notes': notes
  })
}