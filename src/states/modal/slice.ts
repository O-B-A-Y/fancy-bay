import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';

export interface ModalState {
  status: ThunkFetchState;
  data: {
    proposal: boolean;
    noContract: boolean;
    bayCreation: boolean;
  };
  error: null | object | string;
}

const initialState: ModalState = {
  status: ThunkFetchState.Idle,
  data: {
    proposal: false,
    noContract: false,
    bayCreation: false,
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
    toggleBayCreationModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.bayCreation = action.payload;
    },
  },
});

export const {
  toggleNoContractModal,
  toggleProposalModal,
  toggleBayCreationModal,
} = modalSlice.actions;

export default modalSlice.reducer;
