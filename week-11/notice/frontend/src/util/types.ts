export type noticeData = {
  title: string;
  description: string;
  pin: boolean
};

export interface Notice {
  _id: string | number;
  title: string;
  description: string;
  pin: boolean
  createdAt?: string;
  updatedAt?: string;
}

export type Flasy = {
  message: string;
  type: string;
};