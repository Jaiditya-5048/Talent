export type noticeData = {
  title: string;
  description: string;
  pin: boolean
};

export interface NoticeApi {
  _id: string | number;
  title: string;
  description: string;
  pin: boolean;
  categories: {category: categoryApiResponse,order:number, _id: string}[];  //the _id here the subdocumnet id given by mongoose
  createdAt?: string;
  updatedAt?: string;
}

export type Flasy = {
  message: string;
  type: string;
};

export type categoryApiResponse = {
  _id: string
  category: string;
  counter: number;
};