import { Request, Response } from 'express'

export const getLoggedIn = async (req: Request, res: Response) => {

  return res.json(req.user)
}