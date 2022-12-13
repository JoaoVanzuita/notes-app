import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { UsersService } from '../../services'
import bcrypt from 'bcrypt'
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

  const encryptedPassword = await bcrypt.hash(data.password, 10)

  const user = await UsersService.create(data.name, encryptedPassword)

  return res.status(201).json({
    'id': user.id
  })
}