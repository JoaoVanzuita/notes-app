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
    name: yup.string().min(3, 'O nome deve ter no mínimo 3 caracteres').required('O nome é obrigatório'),
    password: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('A senha é obrigatória')
  })
})

export const create = async (req: Request<{}, {}, ICreate>, res: Response) => {
  const data = req.body

  const encryptedPassword = await bcrypt.hash(data.password, 10)

  await UsersService.create(data.name, encryptedPassword)

  return res.status(201).send()
}