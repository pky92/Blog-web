import express from "express";
import { signIn, signUp , googleAuth } from "../controllers/auth.controller.js";
const router = express.Router();

router.post('/signUp' , signUp);
router.post('/signIn' , signIn);
router.post('/google' , googleAuth);


export default router;