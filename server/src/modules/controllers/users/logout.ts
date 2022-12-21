import { Request, Response } from 'express'

export const logout = async (req: Request, res: Response) => {

  return res.clearCookie('accessToken', {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
  }).send()
}