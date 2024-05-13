import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import reducer from "./reducers/index";

export const store = configureStore({
  reducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
