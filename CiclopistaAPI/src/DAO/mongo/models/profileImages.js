import mongoose from "mongoose";

const ordersCollection = "profileImages";

const ordersSchema = mongoose.Schema({

  filename: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  uploadDate: {
    type: Date, //pillar si lo hacemos como el ticket
    required: true,
  },
  Data: {
    type: Buffer,
    required: true,
  },
});

const profileImageModel = mongoose.model(ordersCollection, ordersSchema);

export default profileImageModel;