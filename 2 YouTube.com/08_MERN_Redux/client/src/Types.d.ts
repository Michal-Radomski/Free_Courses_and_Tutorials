import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Fetch = typeof store.fetch;
export type Action = typeof store.action;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): JSX.Element => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
