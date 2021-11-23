import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';

interface TokenDetails {
  name?: string;
  symbol?: string;
  address?: string;
}

interface ExchangeState {
  status: ThunkFetchState;
  data: {
    firstPair?: TokenDetails | null;
    secondPair?: TokenDetails | null;
  };
  error: null | object | string;
}

const initialState: ExchangeState = {
  status: ThunkFetchState.Idle,
  data: {
    firstPair: {
      name: 'Ethereum',
      symbol: 'ETH',
    },
    secondPair: null,
  },
  error: null,
};

const greetingSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    selectFirstPair(state, action: PayloadAction<TokenDetails>) {
      state.data.firstPair = action.payload;
    },
    selectSecondPair(state, action: PayloadAction<TokenDetails>) {
      state.data.secondPair = action.payload;
    },
  },
});

export const { selectFirstPair, selectSecondPair } = greetingSlice.actions;

export default greetingSlice.reducer;
