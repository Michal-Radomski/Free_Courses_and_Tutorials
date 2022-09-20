// Types and Interfaces

export interface IPost {
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likeCount: number;
  createdAt: Date;
}

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Fetch = typeof store.fetch;
