import { Request, Response } from 'express'

export const deleteById = async (req: Request, res: Response) => {

  return res.send('deleteById - OK')
}