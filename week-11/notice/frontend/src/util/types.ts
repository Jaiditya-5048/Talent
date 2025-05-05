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
  categories: catagoryApiResponse[];
  createdAt?: string;
  updatedAt?: string;
}

export type Flasy = {
  message: string;
  type: string;
};

export type catagoryApiResponse = {
  _id: string
  category: string;
  counter: number;
};