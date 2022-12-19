import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { NotesService } from '../../services'
import * as yup from 'yup'

interface IGetByDateQuery {
  start?: Date
  end?: Date
}

export const getByDateValidation = validation({
  query: yup.object().shape({
    start: yup.date().required(),
    end: yup.date().required()
  })
})

export const getByDate = async (req: Request<{}, {}, {}, IGetByDateQuery>, res: Response) => {
  const { start, end } = req.query
  const user = req.user

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const notes = await NotesService.getByDate(start!, end!, user)


  return res.json({
    'notes': notes
  })
}