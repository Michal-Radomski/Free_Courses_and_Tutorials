import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../Interfaces";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): JSX.Element => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
