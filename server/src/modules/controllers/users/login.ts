import { Request, Response } from 'express'
import { validation } from '../../middleware'
import { UsersService } from '../../services'
import { Environment } from '../../environment'
import * as yup from 'yup'

interface ILogin {
  name: string
  password: string
}

export const loginValidation = validation({
  body: yup.object().shape({
    name: yup.string().min(3, Environment.TOO_SHORT_NAME).max(100, Environment.TOO_LONG_NAME).required(Environment.REQUIRED_NAME),
    password: yup.string().min(8, Environment.TOO_SHORT_PASS).max(20, Environment.TOO_SHORT_PASS).required(Environment.REQUIRED_PASS)
  })
})

export const login = async (req: Request<{}, {}, ILogin>, res: Response) => {
  const data = req.body

  const accessToken = await UsersService.login(data.name, data.password)

  return res.cookie('accessToken', accessToken, {
    httpOnly: true,
  }).send()
}