import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import exchangeSlice from '../states/exchange/slice';
import modalSlice from '../states/modal/slice';
import proposalSlice from '../states/proposal/slice';
import treasureBaySlice from '../states/treasureBay/slice';
import walletSlice from '../states/wallet/slice';
/* Main Redux Global Store configurations */
export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    walletSlice,
    modalSlice,
    treasureBaySlice,
    proposalSlice,
    exchangeSlice,
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
