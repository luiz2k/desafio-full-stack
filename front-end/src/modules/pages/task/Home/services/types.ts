export type Tasks = {
  message: string;
  data: {
    id: number;
    title: string;
    userId: number;
  }[];
};
