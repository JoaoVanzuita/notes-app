import { Request, Response } from 'express'

export const getAllByUser = async (req: Request, res: Response) => {

  res.send('getAllByUser - OK')
}