import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import ThunkFetchState from '../../constants/fetch';
import {
  NativeCurrencyDetails,
  TokenDetails,
  TokenMetadata,
} from '../../types/Token';
import URLUtils from '../../utils/url';

interface ListProvider {
  name: string;
  listURL: string;
  logoURI: string;
  numOfTokens?: number;
}

interface ExchangeState {
  status: ThunkFetchState;
  data: {
    tokens: (TokenDetails | NativeCurrencyDetails)[];
    listProviders: ListProvider[];
  };
  error: null | object | string;
}

// Init ETH as our native currency in the list of swap-able tokens
const initialState: ExchangeState = {
  status: ThunkFetchState.Idle,
  data: {
    tokens: [
      {
        chainId: 1,
        decimals: 18,
        name: 'Ethereum',
        symbol: 'ETH',
        logoURI: 'ipfs://QmXtMayDwgVLDuDhzy89uw27bY9cRtVJXecTUcCksPZgsV',
      },
    ],
    listProviders: [],
  },

  error: null,
};

/**
 * Fetch metadata regarding token list (IPFS, HTTPS)
 */
export const importTokenList = createAsyncThunk(
  'token/importTokenList',
  async (URL: string) => {
    const validUrl = URLUtils.processValidURL(URL);
    const response = await axios.get(validUrl);
    const data: TokenMetadata = response.data;
    return data.tokens;
  }
);

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(importTokenList.pending, (state) => {
        state.status = ThunkFetchState.Pending;
      })
      .addCase(importTokenList.fulfilled, (state, action) => {
        state.status = ThunkFetchState.Fulfilled;
        state.data.tokens = state.data.tokens.concat(action.payload); // Add new tokens to list
      })
      .addCase(importTokenList.rejected, (state, action) => {
        state.status = ThunkFetchState.Rejected;
        state.error = action.error;
      });
  },
});

// NOTE: Currently not use pure Redux Actions (export {} = tokenSlice.actions)

export default tokenSlice.reducer;
