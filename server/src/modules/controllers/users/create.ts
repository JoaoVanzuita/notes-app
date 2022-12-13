import { Request, RequestHandler, Response } from 'express'
import * as yup from 'yup'
import { ServerError } from '../../errors/ServerError'

interface ICreate {
  name: string
  password: string
}

const bodyValidation: yup.SchemaOf<ICreate> = yup.object().shape({
  name: yup.string().min(3).required(),
  password: yup.string().min(8).required(),
})

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false })

    return next()
  } catch (err) {
    const yupErrors = err as yup.ValidationError
    const errors: Record<string, string> = {}

    yupErrors.inner.forEach(error => {

      if (!error.path) return

      errors[error.path] = error.message
    })

    return res.status(400).json({ errors })
  }
}

export const create = async (req: Request<{}, {}, ICreate>, res: Response) => {
  const data = req.body


  return res.send(data)
}