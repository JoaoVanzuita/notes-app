import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { UsersService } from '../../services'
import * as yup from 'yup'
import bcrypt from 'bcrypt'

interface IUpdateBody {
  name: string
  password: string
}

export const updateValidation = validation({
  body: yup.object().shape({
    name: yup.string().min(3).required(),
    password: yup.string().min(8).required()
  })
})

export const updateById = async (req: Request<{}, {}, IUpdateBody>, res: Response) => {
  const data = req.body
  const id = req.user.id

  const encryptedPassword = await bcrypt.hash(data.password, 10)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const newUser = await UsersService.updateById(id!, data.name, encryptedPassword)

  return res.json({
    'id': newUser.id
  })
}