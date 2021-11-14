import { Web3Provider } from '@ethersproject/providers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChainId, Currency } from '@sushiswap/sdk';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { connectors } from 'src/connectors';
import { Token, TokenAllowed } from 'src/constants/token';
import Web3 from 'web3';
import ThunkFetchState from '../../constants/fetch';

export type Web3Environment = Omit<
  Web3ReactContextInterface<Web3Provider> & {
    chainId?: ChainId | undefined;
    isDevelopment: boolean;
  },
  'activate' | 'deactivate' | 'setError' | 'connector'
>;
export interface WalletState {
  status: ThunkFetchState;
  data: {
    connector: keyof typeof connectors | null;
    currencyId: string;
    tokens: Partial<{
      [key in TokenAllowed]: Token;
    }>;
    environment: Web3Environment;
  };
  error: null | object | string;
}

const initialState: WalletState = {
  status: ThunkFetchState.Idle,
  data: {
    currencyId: '',
    connector: null,
    tokens: {},
    environment: {
      isDevelopment: false,
      active: false,
      account: null,
      chainId: undefined,
      error: undefined,
    },
  },
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    switchWeb3Environment(state, action: PayloadAction<Web3Environment>) {
      state.data.environment = { ...state.data.environment, ...action.payload };
    },
    switchConnector(
      state,
      action: PayloadAction<keyof typeof connectors | null>
    ) {
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

export const {
  switchConnector,
  selectCurrency,
  addToken,
  switchWeb3Environment,
} = walletSlice.actions;

export default walletSlice.reducer;
