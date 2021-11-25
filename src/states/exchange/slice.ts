import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';
import { NativeCurrencyDetails, TokenDetails } from '../../types/Token';

interface ExchangeState {
  status: ThunkFetchState;
  data: {
    firstPair?: TokenDetails | NativeCurrencyDetails | null;
    secondPair?: TokenDetails | NativeCurrencyDetails | null;
  };
  error: null | object | string;
}

const initialState: ExchangeState = {
  status: ThunkFetchState.Idle,
  data: {
    firstPair: {
      chainId: 1,
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
      logoURI: 'ipfs://QmXtMayDwgVLDuDhzy89uw27bY9cRtVJXecTUcCksPZgsV',
    },
    secondPair: null,
  },
  error: null,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    selectFirstPair(
      state,
      action: PayloadAction<TokenDetails | NativeCurrencyDetails>
    ) {
      state.data.firstPair = action.payload;
    },
    selectSecondPair(
      state,
      action: PayloadAction<TokenDetails | NativeCurrencyDetails>
    ) {
      state.data.secondPair = action.payload;
    },
  },
});

export const { selectFirstPair, selectSecondPair } = exchangeSlice.actions;

export default exchangeSlice.reducer;
