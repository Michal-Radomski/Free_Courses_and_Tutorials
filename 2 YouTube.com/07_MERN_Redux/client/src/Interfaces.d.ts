// Types and Interfaces

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: AppDispatch
type AppDispatch = typeof store.dispatch;
