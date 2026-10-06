import { body, validationResult } from 'express-validator'


const registerValidator = [

    body('email')
      .exists().withMessage("Email is required")
      .trim()
      .isEmail().withMessage("Invalid Email address"),

    body('name')  
      .exists().withMessage("Name is required")
      .isString().withMessage("Name must be a string")
      .trim()
      .isLength({min:2, max:10}).withMessage("Name length must be between 2 to 10 characters"),
      
    body('password')
      .exists().withMessage("password is required")  
      .isString().withMessage("Name must be a string")
      .trim()
      .isLength({min:6}).withMessage("password atleast 6 characters long"),


      (req, res, next) => {

         const errors = validationResult(req)

         if(!errors.isEmpty()){
            res.status(400).json({
                message:"Invalid Request",
                errors:errors.array()
            })
         }

         next()


      }
    
]





export default registerValidator