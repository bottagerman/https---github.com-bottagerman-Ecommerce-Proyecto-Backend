import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {type: Number}
      },
    ],
    default: [],
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
