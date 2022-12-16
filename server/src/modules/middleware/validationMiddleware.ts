/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express'
import * as yup from 'yup'

type TProperty = 'body' | 'params' | 'header' | 'query'

type TAllSchemas = Record<TProperty, yup.SchemaOf<any> >

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler

export const validation: TValidation = (schemas) => async (req, res, next) => {

  const errors: string[] = []

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false })

    } catch (err) {
      const yupErrors = err as yup.ValidationError

      yupErrors.inner.forEach(error => {

        errors.push(error.message)
      })
    }
  })

  if (errors.length) {
    return res.status(400).json({ message: errors.join(', ') })
  }

  return next()
}