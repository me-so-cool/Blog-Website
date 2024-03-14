import express, { Router } from "express";
import {addUser} from "../controllers/user.js"

const router = express.Router()

router.get("/test",addUser)

export default router;