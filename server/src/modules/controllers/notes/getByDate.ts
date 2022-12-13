import { Request, Response } from 'express'

export const getByDate = async (req: Request, res: Response) => {

  res.send('getByDate - OK')
}