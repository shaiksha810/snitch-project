import { Router } from "express";
import userRegister from '../controllers/auth.controller.js'


const router = Router()


// api/auth/register
router.post("/auth/register", userRegister)


export default router