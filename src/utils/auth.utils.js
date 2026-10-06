import jwt from 'jsonwebtoken'
import config from '../config/config.js'


export const generateAccessToken = (user) => {
   
  return jwt.sign(
    {
        userId:user._id,
        role:user.role
    },
    config.ACCESS_TOKEN_SECRET,
    {
        expiresIn:"15m"
    }
  )

}   




export const generateRefreshToken = (user) => {
   
  return jwt.sign(
    {
        userId:user._id,
    },
    config.ACCESS_TOKEN_SECRET,
    {
        expiresIn:"7d"
    }
  )

}   





