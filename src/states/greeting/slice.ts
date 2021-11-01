import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';

interface GreetingState {
  status: ThunkFetchState;
  data: string;
  error: null | object | string;
}

const initialState: GreetingState = {
  status: ThunkFetchState.Idle,
  data: 'Hello World',
  error: null,
};

const greetingSlice = createSlice({
  name: 'greeting',
  initialState,
  reducers: {
    greet(state, action: PayloadAction<string>) {
      state.data = `Hello, ${action.payload}`;
    },
    bye(state, action: PayloadAction<string>) {
      state.data = `Bye, ${action.payload}`;
    },
  },
});

export const { greet, bye } = greetingSlice.actions;

export default greetingSlice.reducer;
