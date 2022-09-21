// Types and Interfaces

export interface IPost {
  title: string;
  message: string;
  creator: string;
  tags: string[] | string;
  selectedFile: string;
  likeCount?: number;
  createdAt?: Date;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Fetch = typeof store.fetch;
export type Action = typeof store.action;

export interface CustomError extends Error {
  message: string;
}
