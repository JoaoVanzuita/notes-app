import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { UsersService } from '../../services'
import { Environment } from '../../environment'
import bcrypt from 'bcrypt'
import * as yup from 'yup'

interface IUpdateBody {
  name: string
  password: string
}

export const updateValidation = validation({
  body: yup.object().shape({
    name: yup.string().min(3, Environment.TOO_SHORT_NAME).max(100, Environment.TOO_LONG_NAME).required(Environment.REQUIRED_NAME),
    password: yup.string().min(8, Environment.TOO_SHORT_PASS).max(20, Environment.TOO_SHORT_PASS).required(Environment.REQUIRED_PASS)
  })
})

export const updateById = async (req: Request<{}, {}, IUpdateBody>, res: Response) => {
  const data = req.body
  const id = req.user.id

  const encryptedPassword = await bcrypt.hash(data.password, 10)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await UsersService.updateById(id!, data.name, encryptedPassword)

  return res.status(204).send()
}