import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';

export interface ModalState {
  status: ThunkFetchState;
  data: {
    transferProposal: boolean;
    exchangeProposal: boolean;
    proposalCreation: boolean;
    noContract: boolean;
    bayCreation: boolean;
    injectedConnectorError: boolean;
    selectTokenPair: boolean;
  };
  error: null | object | string;
}

const initialState: ModalState = {
  status: ThunkFetchState.Idle,
  data: {
    transferProposal: false,
    exchangeProposal: false,
    proposalCreation: false,
    noContract: false,
    bayCreation: false,
    injectedConnectorError: false,
    selectTokenPair: false,
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
    toggleProposalCreationModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.proposalCreation = action.payload;
    },
    toggleInjectedConnectorErrorModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.bayCreation = action.payload;
    },
    toggleSelectTokenPairModal(state, action: PayloadAction<boolean>) {
      console.log(action);
      state.data.selectTokenPair = action.payload;
    },
  },
});

export const {
  toggleNoContractModal,
  toggleExchangeProposalModal,
  toggleBayCreationModal,
  toggleInjectedConnectorErrorModal,
  toggleTransferProposalModal,
  toggleProposalCreationModal,
  toggleSelectTokenPairModal,
} = modalSlice.actions;

export default modalSlice.reducer;
