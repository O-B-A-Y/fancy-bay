import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '@sushiswap/sdk';
import { connectors } from 'src/connectors';
import ThunkFetchState from '../../constants/fetch';

export interface WalletState {
  status: ThunkFetchState;
  data: {
    connector: keyof typeof connectors | null;
    currencyId: string;
  };
  error: null | object | string;
}

const initialState: WalletState = {
  status: ThunkFetchState.Idle,
  data: {
    currencyId: '',
    connector: null,
  },
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    switchConnector(
      state,
      action: PayloadAction<keyof typeof connectors | null>
    ) {
      console.log(action);
      state.data.connector = action.payload;
    },
    selectCurrency(state, action: PayloadAction<Currency>) {
      state.data.currencyId = action.payload.isToken
        ? action.payload.address
        : action.payload.isNative
        ? 'ETH'
        : '';
    },
  },
});

export const { switchConnector, selectCurrency } = walletSlice.actions;

export default walletSlice.reducer;
