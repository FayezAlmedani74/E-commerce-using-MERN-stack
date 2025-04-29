import { boolean } from "joi";
import mongoose, { Schema, Document, Query } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
  deleted: boolean;
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  deleted: {type : Boolean},
}, {timestamps: true});
productSchema.index({title: 'text',description: 'text'})
// Query Middleware
productSchema.pre(/^find/, function(this: Query<any, any>, next) {
  this.where({ deleted: { $ne: true } });
  next();
});

// Soft Delete Method
productSchema.methods.softDelete = async function() {
  this.deleted = true;
  this.deletedAt = new Date();
  await this.save();
};
const productModel = mongoose.model<IProduct>("Product", productSchema);

export default productModel;
