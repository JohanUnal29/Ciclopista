import { userProfileService } from "../DAO/mongo/services/userProfile.service.js";
import CustomError from "../DAO/mongo/services/errors/custom-error.js";
import EErros from "../DAO/mongo/services/errors/enum.js";

class UserProfileController {
  addProfileImage = async (req, res) => {
    try {
      const imageDetails = {
        filename: req.file.filename,
        contentType: req.file.mimetype,
        length: req.file.size,
        uploadDate: new Date(),
        data: req.file.buffer,
        email: req.email,
      };

      console.log("details: "+JSON.stringify(imageDetails, null, 2));
      console.log("data: "+imageDetails.data)
      await userProfileService.addProfileImage(req.file.buffer);

      // let ticketCode = uuidv4().toString();

      return res.send({ status: "OK", message: "Image successfully added" });
    } catch (error) {
      // req.logger.debug({
      //     message: `Product with ID ${cartItem._id} is out of stock or not found.`,
      //     Date: new Date().toLocaleTimeString(),
      // });

      return res.status(400).send({
        status: "error",
        error: error,
        cause: "Image error",
      });

      // CustomError.createError({
      //     name: "Error-add-product-to-the-cart",
      //     cause: `Product is out of stock or not found.`,
      //     message: `Product with ID is out of stock or not found.`,
      //     code: EErros.ADDPRODUCT_TO_CART_ERORR,
      // });
    }
  };
}

export const userProfileController = new UserProfileController();
