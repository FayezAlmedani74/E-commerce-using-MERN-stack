export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  _id: string;
  shipping: {
    address: string;
    city: string;
    postal: string;
    country: string;
  };
  orderItems?: OrderItem[]; // optional to prevent crash
  total: number;
  createdAt: string;
}
