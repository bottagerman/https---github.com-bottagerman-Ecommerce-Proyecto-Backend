import mongoose from "mongoose";
import { Schema } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", 
    required: false,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: { type: Number, default: 0 },
    },
  ],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
