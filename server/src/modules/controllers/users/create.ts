import { Request, Response } from 'express'
import { validation } from '../../middleware'
import * as yup from 'yup'

interface ICreate {
  name: string
  password: string
}

export const createValidation = validation({
  body: yup.object().shape({
    name: yup.string().min(3).required(),
    password: yup.string().min(8).required()
  })
})

export const create = async (req: Request<{}, {}, ICreate>, res: Response) => {
  const data = req.body


  return res.send(data)
}