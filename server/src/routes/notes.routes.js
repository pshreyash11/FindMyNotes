import { Router } from "express";
import { uploadNotes , getNotes } from "../controllers/notes.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/upload").post(
    verifyJWT,
    upload.fields([
        {
            name:"files",
            maxCount: 1
        }
    ]),
    uploadNotes
    )

router.route("/getFiles").get(
    getNotes
)

export default router;