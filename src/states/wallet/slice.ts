import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency } from '@sushiswap/sdk';
import { connectors } from 'src/connectors';
import { Token, TokenAllowed } from 'src/constants/token';
import ThunkFetchState from '../../constants/fetch';

export interface WalletState {
  status: ThunkFetchState;
  data: {
    connector: keyof typeof connectors | null;
    currencyId: string;
    tokens: Partial<{
      [key in TokenAllowed]: Token;
    }>;
  };
  error: null | object | string;
}

const initialState: WalletState = {
  status: ThunkFetchState.Idle,
  data: {
    currencyId: '',
    connector: null,
    tokens: {},
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
    addToken(state, action: PayloadAction<Token>) {
      state.data.tokens = {
        ...state.data.tokens,
        [action.payload.symbol]: action.payload,
      };
    },
  },
});

export const { switchConnector, selectCurrency, addToken } =
  walletSlice.actions;

export default walletSlice.reducer;
