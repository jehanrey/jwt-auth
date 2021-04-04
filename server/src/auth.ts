import { sign } from 'jsonwebtoken'
import { Response } from 'express'

import { User } from './entity/User'

export const createAccessToken = (user: User) => (
  sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '15m' },
  )
)

export const createRefreshToken = (user: User) => (
  sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '7d' },
  )
)

export const sendRefreshToken = (res: Response, token: string) => {
  return res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh-token',
  })
}