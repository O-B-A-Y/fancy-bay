import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';
import { TreasureBayType } from './types';

interface TreasureBayState {
  status: ThunkFetchState;
  data: {
    treasureBays: TreasureBayType[];
  };
  error: null | object | string;
}

const initialState: TreasureBayState = {
  status: ThunkFetchState.Idle,
  data: {
    treasureBays: [],
  },
  error: null,
};

const treasureBaySlice = createSlice({
  name: 'treasureBaySlice',
  initialState,
  reducers: {
    setTreasureBays(state, action: PayloadAction<TreasureBayType[]>) {
      state.data.treasureBays = action.payload;
    },
  },
});

export const { setTreasureBays } = treasureBaySlice.actions;

export default treasureBaySlice.reducer;
