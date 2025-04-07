type review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export type CardData = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number
  brand: string;
  images: [string];
  thumbnail: string;
  quantity: number;
  reviews: review[];
};

export type ApiResponseProductData = {
  limit: number;
  skip: number;
  total: number;
  products: [CardData];
};

export type UserData = {
  first_Name: string;
  last_Name: string;
  email: string;
  password: string;
};

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  images: string[];
}

export type ApiCart = {
  id:string;
  email: string;
  cart: Product[]
}
