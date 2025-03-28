 export type CardData = {
   id: number;
   title: string;
   description: string;
   category: string;
   price: number;
   brand: string;
   images: [string];
   thumbnail: string;
 };

export type ApiResponseProductData = {
  limit: number;
  skip: number;
  total: number;
  products: [CardData];
};