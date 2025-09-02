// import mongoose, { Schema, Document, ObjectId } from "mongoose";

// export interface IOrderItem {
//   productTitle: string;
//   productImage: string;
//   unitPrice: number;
//   quantity: number;
// }

// export interface IOrder extends Document {
//   orderItems: IOrderItem[];
//   total: number;
//   address: string;
//   userId: ObjectId | string;
// }

// const OrderItemSchema = new Schema<IOrderItem>({
//   productTitle: { type: String, required: true },
//   productImage: { type: String, required: true },
//   unitPrice: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// },{timestamps: true});
// const OrderSchema = new Schema<IOrder>({
//   orderItems: [OrderItemSchema],
//   total: { type: Number, required: true },
//   address: { type: String, required: true },
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
// }, {timestamps: true});
// OrderSchema.index({ userId: 1, createdAt: -1 });
// export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);

import mongoose, { Schema, Document, ObjectId } from "mongoose";

// Order Item Interface
export interface IOrderItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

// Shipping Info Interface
export interface IShippingInfo {
  address: string;
  city: string;
  postal: string;
  country: string;
}

// Order Interface
export interface IOrder extends Document {
  orderItems: IOrderItem[];
  total: number;
  shipping: IShippingInfo;
  userId: ObjectId | string;
}

// Schemas
const OrderItemSchema = new Schema<IOrderItem>(
  {
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const ShippingSchema = new Schema<IShippingInfo>(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postal: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
); // _id: false prevents Mongoose from creating a subdocument ID

const OrderSchema = new Schema<IOrder>(
  {
    orderItems: [OrderItemSchema],
    total: { type: Number, required: true },
    shipping: { type: ShippingSchema, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

OrderSchema.index({ userId: 1, createdAt: -1 });

export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);
