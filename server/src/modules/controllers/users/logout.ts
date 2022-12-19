import { Request, Response } from 'express'

export const logout = async (req: Request, res: Response) => {

  return res.clearCookie('accessToken', {
    path: '/',
    domain: 'localhost'
  }).send()
}