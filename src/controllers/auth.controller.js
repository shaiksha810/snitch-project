import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils.js";





const userRegister = async (req,res) => {
  

    try {
        
        const { email, name, password } = req.body

        const userAlreadyExists = await userModel.findOne({email})

        if(userAlreadyExists){
            return res.status(404).json({
                message:"User Already Exists"
            })
        }

       
       const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            email,
            name,
            password:hashPassword,
        })
        
        
        const accessToken = generateAccessToken(newUser)
        const refreshToken = generateRefreshToken(newUser)

        res.cookie("refreshToken", refreshToken, {
            httpOnly:true
        })

        await userModel.findByIdAndUpdate(newUser._id, {
            refreshToken: refreshToken
        })


        return res.status(201).json({
            message:"user registered successfully",
            data:{
                email,
                name
            },
            accessToken

        })



    } catch (error) {
        return res.status(400).json({
            message:"Invalid Credentials",
            errorMsg:error
        })
    }
}



export default userRegister