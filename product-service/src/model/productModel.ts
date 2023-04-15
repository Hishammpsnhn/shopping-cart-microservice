import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  createdAt: Date;
}

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default model<IProduct>('Product', productSchema);
