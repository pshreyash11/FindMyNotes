import { Router } from "express";
import { loginUser, logoutUser, registerUser , refreshAccessToken , getCurrentUser, saveNoteToUser , unSaveNote} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"profileImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser) 
router.route("/refresh-token").post(refreshAccessToken)//this route is mostly hit by frontend dev.
router.route("/get-user").get(verifyJWT,getCurrentUser)

router.route("/save-note").post(verifyJWT,saveNoteToUser)
router.route("/unsave-note").post(verifyJWT,unSaveNote)

export default router;