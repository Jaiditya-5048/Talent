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
  brand: string;
  images: [string];
  thumbnail: string;
  reviews: review[];
};

export type ApiResponseProductData = {
  limit: number;
  skip: number;
  total: number;
  products: [CardData];
};

export type UserData = {
  fName: string;
  lName: string;
  email: string;
  password: string;
};
