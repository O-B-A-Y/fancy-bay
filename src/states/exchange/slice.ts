import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChainId } from '@sushiswap/sdk';
import axios from 'axios';
import { nativeCurrency } from '../../constants/currency';
import ThunkFetchState from '../../constants/fetch';
import {
  NativeCurrencyDetails,
  TokenDetails,
  TokenMetadata,
} from '../../types/Token';
import ArrayUtils from '../../utils/array';
import URLUtils from '../../utils/url';
import { TreasureBayType } from '../treasureBay/types';

interface ListProvider {
  name: string;
  source: string;
  logoURI: string;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  numOfTokens?: number;
}

interface ExchangeState {
  status: ThunkFetchState;
  data: {
    pair: {
      firstItem?: TokenDetails | NativeCurrencyDetails | null;
      secondItem?: TokenDetails | NativeCurrencyDetails | null;
    };
    token: {
      list: TokenDetails[];
      listProviders: ListProvider[];
    };
    nativeCurrency: NativeCurrencyDetails | null;
    myBay: null | TreasureBayType;
  };
  error: null | object | string;
}

/**
 * Fetch metadata regarding token list (IPFS, HTTPS) including source
 */
export const importTokenList = createAsyncThunk(
  'token/importTokenList',
  async (URL: string) => {
    const validUrl = URLUtils.processValidURL(URL);
    const response = await axios.get(validUrl);
    const data: TokenMetadata = response.data;
    return {
      data,
      source: validUrl,
    };
  }
);

const initialState: ExchangeState = {
  status: ThunkFetchState.Idle,
  data: {
    pair: { firstItem: null, secondItem: null },
    token: {
      list: [],
      listProviders: [],
    },
    nativeCurrency: null,
    myBay: null,
  },
  error: null,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    selectFirstItem(
      state,
      action: PayloadAction<TokenDetails | NativeCurrencyDetails | null>
    ) {
      state.data.pair.firstItem = action.payload;
    },
    selectSecondItem(
      state,
      action: PayloadAction<TokenDetails | NativeCurrencyDetails | null>
    ) {
      state.data.pair.secondItem = action.payload;
    },
    selectMyBay(state, action: PayloadAction<TreasureBayType | null>) {
      state.data.myBay = action.payload;
    },
    switchChainCurrency(state, action: PayloadAction<ChainId>) {
      state.data.nativeCurrency = nativeCurrency[action.payload];
      // Replace first exchange item with native currency (if null)
      if (!state.data.pair.firstItem) {
        state.data.pair.firstItem = nativeCurrency[action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importTokenList.pending, (state) => {
        state.status = ThunkFetchState.Pending;
      })
      .addCase(importTokenList.fulfilled, (state, action) => {
        state.status = ThunkFetchState.Fulfilled;
        // Check if provider is already fetched/fulfilled (by source)
        if (
          state.data.token.listProviders
            .map((p) => p.source)
            .includes(action.payload.source)
        ) {
          return;
        }
        // Push new list provider
        state.data.token.listProviders.push({
          name: action.payload.data.name,
          source: action.payload.source,
          logoURI: action.payload.data.logoURI,
          version: {
            ...action.payload.data.version,
          },
          numOfTokens: action.payload.data.tokens.length,
        });
        // Merge tokens on property 'symbol'
        state.data.token.list = ArrayUtils.mergeOn(
          state.data.token.list,
          action.payload.data.tokens,
          'symbol'
        ) as TokenDetails[];
      })
      .addCase(importTokenList.rejected, (state, action) => {
        state.status = ThunkFetchState.Rejected;
        state.error = action.error;
      });
  },
});

export const {
  selectFirstItem,
  selectSecondItem,
  selectMyBay,
  switchChainCurrency,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
