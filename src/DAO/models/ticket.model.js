import mongoose from "mongoose";
import { Schema } from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new Schema({
  code: { type: String, required: true },
  date_time: { type: Number, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, ref: "users", required: true },
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

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
