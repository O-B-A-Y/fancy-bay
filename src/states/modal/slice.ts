import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';

export interface ModalState {
  status: ThunkFetchState;
  data: {
    proposal: boolean;
    noContract: boolean;
  };
  error: null | object | string;
}

const initialState: ModalState = {
  status: ThunkFetchState.Idle,
  data: {
    proposal: false,
    noContract: false,
  },
  error: null,
};

const modalSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    toggleProposalModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.proposal = action.payload;
    },
    toggleNoContractModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.noContract = action.payload;
    },
  },
});

export const { toggleNoContractModal, toggleProposalModal } =
  modalSlice.actions;

export default modalSlice.reducer;
