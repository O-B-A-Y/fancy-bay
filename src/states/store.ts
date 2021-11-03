import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import greetingSlice from '../states/greeting/slice';
import walletSlice from '../states/wallet/slice';
/* Main Redux Global Store configurations */
export const store = configureStore({
  reducer: {
    greetingSlice,
    walletSlice,
  },
});

/* Types for Hook and Thunk */
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/* Error message type */
export interface KnownThunkError {
  message: string;
}
