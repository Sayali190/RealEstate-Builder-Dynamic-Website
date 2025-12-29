import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    city: String,
    address: String,
    images: [String],
    type: String,
    status: String,
    ownerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
