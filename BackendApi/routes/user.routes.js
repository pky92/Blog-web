import express from "express";
import userController from "../controllers/user.controller.js";
const router = express.Router();

router.get('/test1', userController);

export default router;
