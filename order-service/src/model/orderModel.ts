import { Schema, model, Document } from 'mongoose';


interface IProduct extends Document {
 products:object[];
 user:string
 total_price:number,
 created_at:string

}

const OrderSchema = new Schema({
  products: [
    {
      product_id: String,
    },
  ],
  user: String,
  total_price: Number,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});


export default model<IProduct>('Order', OrderSchema);
