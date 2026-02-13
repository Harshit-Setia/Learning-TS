import {Router} from "express"
import * as UserController from "../controllers/users.js"

const router=Router()

router.get("/", UserController.getAuthenticatedUser)
router.post("/signup",UserController.signUp)
router.post("/login",UserController.login)
router.delete("/logout",UserController.logout)

export default router