import { Request, Response } from 'express'

export const getByTitle = async (req: Request, res: Response) => {

  res.send('getByTitle - OK')
}