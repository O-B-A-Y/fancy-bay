import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';

export interface ModalState {
  status: ThunkFetchState;
  data: {
    transferProposal: boolean;
    exchangeProposal: boolean;
    noContract: boolean;
    bayCreation: boolean;
    injectedConnectorError: boolean;
  };
  error: null | object | string;
}

const initialState: ModalState = {
  status: ThunkFetchState.Idle,
  data: {
    transferProposal: false,
    exchangeProposal: false,
    noContract: false,
    bayCreation: false,
    injectedConnectorError: false,
  },
  error: null,
};

const modalSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    toggleExchangeProposalModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.exchangeProposal = action.payload;
    },
    toggleTransferProposalModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.transferProposal = action.payload;
    },
    toggleNoContractModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.noContract = action.payload;
    },
    toggleBayCreationModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.bayCreation = action.payload;
    },
    toggleInjectedConnectorErrorModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.bayCreation = action.payload;
    },
  },
});

export const {
  toggleNoContractModal,
  toggleExchangeProposalModal,
  toggleBayCreationModal,
  toggleInjectedConnectorErrorModal,
  toggleTransferProposalModal,
} = modalSlice.actions;

export default modalSlice.reducer;
