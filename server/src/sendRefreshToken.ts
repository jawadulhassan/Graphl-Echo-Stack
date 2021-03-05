import {Response} from 'express';

export const sendRefreshToken = (res: Response, token: String) => {
  res.cookie("jim", token, {
    httpOnly: true
  })
}