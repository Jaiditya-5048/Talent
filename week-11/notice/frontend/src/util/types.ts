export type noticeData = {
  title: string;
  description: string;
};

export interface Notice {
  _id: string | number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}