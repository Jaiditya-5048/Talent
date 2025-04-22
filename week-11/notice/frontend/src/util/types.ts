export type noticeData = {
  title: string;
  description: string;
};

export interface Notice {
  _id: string | number;
  title: string;
  description: string;
  pin: boolean
  createdAt: string;
  updatedAt: string;
}

export type flasy = {
  message: string;
  type: string;
};