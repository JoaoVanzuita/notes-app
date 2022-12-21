import { Request, Response } from 'express'

export const logout = async (req: Request, res: Response) => {

  return res.clearCookie('accessToken', {
    domain: 'https://notes-app-t8oi.onrender.com/',
    path: '/',
  }).send()
}