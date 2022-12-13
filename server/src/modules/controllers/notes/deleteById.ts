import { Request, Response } from 'express'

export const deleteById = async (req: Request, res: Response) => {

  res.send('deleteById - OK')
}