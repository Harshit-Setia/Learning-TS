import {Router} from "express"
import * as UserController from "../controllers/users.js"
import { auth } from "../middleware/auth.js"

const router=Router()

router.get("/", auth ,UserController.getAuthenticatedUser)
router.post("/signup",UserController.signUp)
router.post("/login",UserController.login)
router.delete("/logout",UserController.logout)

export default router