/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express'
import { SchemaOf, ValidationError } from 'yup'

type TProperty = 'body' | 'params' | 'header' | 'query'

type TAllSchemas = Record<TProperty, SchemaOf<any> >

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler

export const validation: TValidation = (schemas) => async (req, res, next) => {

  const errorsResult: Record<string, Record<string, string>> = {}

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false })

    } catch (err) {
      const yupErrors = err as ValidationError
      const errors: Record<string, string> = {}

      yupErrors.inner.forEach(error => {

        if (!error.path) return

        errors[error.path] = error.message
      })

      errorsResult[key] = errors
    }
  })

  if (Object.entries(errorsResult).length) {
    return res.status(400).json({ errors: errorsResult })
  }

  return next()
}