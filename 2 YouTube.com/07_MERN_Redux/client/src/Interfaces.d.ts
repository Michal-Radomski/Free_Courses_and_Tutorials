// Types and Interfaces

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: AppDispatch
export type AppDispatch = typeof store.dispatch;

export interface CustomError extends Error {
  data?: { message: string };
  message?: string;
}
