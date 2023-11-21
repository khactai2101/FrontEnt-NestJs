export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  brand: string;
  images: {
    id: number;
    url: string;
  }[];
  capacity: {
    id: number;
    name: string;
    price: number;
  }[];
  provider: string;
  category: string;
  stock: number;
  quantity: number;
  feedback: {
    comment: string;
    rating: number;
  }[];
  totalRating: number;
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: number;
  address: string;
  cart: [];
  discount: number;
  role: string;
  avatar: string;
  status: string;
}
