import {Router} from "express"
import { signUp } from "../controllers/users.js"

const router=Router()

router.post("/",signUp)

export default router