export type Camera = {
  id: number | string;
  url: string;
  username: string;
  password: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
};
