import { Router } from "express";
import { userProfileController } from "../controllers/userProfile.controller.js";
import { uploader } from "../utils/multer.js";

const router = Router();

router.post("/addprofileimage", uploader.single('file'), userProfileController.addProfileImage);

export default router;