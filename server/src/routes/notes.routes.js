import { Router } from "express";
import { uploadNotes , getNotes , getNotesByID , updateNotes , getNotesByNotesId } from "../controllers/notes.controller.js"
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

router.route("/getFiles/:id").get(
    getNotesByID
)

router.route("/update/:id").patch(
    verifyJWT,
    upload.fields([{ name: "files", maxCount: 1 }]),
    updateNotes
  );

router.route("/getNoteWithID").post(
    getNotesByNotesId
)

export default router;