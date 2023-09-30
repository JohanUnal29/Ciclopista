import profileImageModel from "../models/profileImages.js";
import CustomError from "./errors/custom-error.js";
import EErros from "./errors/enum.js";

class UserProfileService {
    constructor() {}
  
    addProfileImage = async (imageDetails) => {
      try {
        const createdImage = await profileImageModel.create(imageDetails);
        const user = await UserModel.findOne({ email: imageDetails.email });
        console.log(createdImage);
        if (user) {
          user.push({ profileImage: createdImage._id });
          await user.save();
        }
        return createdImage;
      } catch (error) {
        CustomError.createError({
          name: "Error-add-image-IN-SERVICE",
          cause: error,
          message: "An error occurred while adding the image",
          code: EErros.DATABASES_READ_ERROR,
        });
  
        req.logger.error({
          message: "An error occurred while adding the image IN SERVICE",
          cause: error,
          Date: new Date().toLocaleTimeString(),
          stack: JSON.stringify(error.stack, null, 2),
        });
      }
    };
  
  }
  
  export const userProfileService = new UserProfileService();
  