import { Request, Response } from 'express'

export const create = async (req: Request, res: Response) => {

  res.send('create - OK')
}