import {Router} from "express"
import * as Controller from "../controllers/notes.js"

const router=Router()

router.get("/",Controller.getNotes)
router.get("/:noteID",Controller.getNote)
router.post("/",Controller.createNote)
router.patch("/:noteID",Controller.updateNote)
router.delete("/:noteID",Controller.deleteNote)

export default router