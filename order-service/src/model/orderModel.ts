import mongoose, { Schema, Document } from "mongoose";

export interface IProduct {
  product_id: string;
}

export interface IOrder extends Document {
  products: IProduct[];
  user: string;
  total_price: number;
  created_at: Date;
}

const OrderSchema: Schema = new Schema({
  products: [
    {
      product_id: { type: String },
    },
  ],
  user: { type: String },
  total_price: { type: Number },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
