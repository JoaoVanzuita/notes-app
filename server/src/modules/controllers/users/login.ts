import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { UsersService } from '../../services'
import * as yup from 'yup'

interface ILogin {
  name: string
  password: string
}

export const loginValidation = validation({
  body: yup.object().shape({
    name: yup.string().min(3, 'O nome deve ter no mínimo 3 caracteres').required('O nome é obrigatório'),
    password: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('A senha é obrigatória')
  })
})

export const login = async (req: Request<{}, {}, ILogin>, res: Response) => {
  const data = req.body

  const accessToken = await UsersService.login(data.name, data.password)

  return res.cookie('accessToken', accessToken, {
    httpOnly: true,
  }).send()
}