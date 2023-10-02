import { Router } from "express";
import { userProfileController } from "../controllers/userProfile.controller.js";
import { uploader } from "../utils/multer.js";

const router = Router();

router.post("/addprofileimage", userProfileController.addProfileImage);
router.get("/email/:email", userProfileController.getImageByEmail);

export default router;