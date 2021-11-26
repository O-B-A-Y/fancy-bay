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
    tokenPairSelection: boolean;
    myBaysSelectionModal: boolean;
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
    tokenPairSelection: false,
    myBaysSelectionModal: false,
  },
  error: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleExchangeProposalModal(state, action: PayloadAction<boolean>) {
      state.data.exchangeProposal = action.payload;
    },
    toggleTransferProposalModal(state, action: PayloadAction<boolean>) {
      state.data.transferProposal = action.payload;
    },
    toggleNoContractModal(state, action: PayloadAction<boolean>) {
      state.data.noContract = action.payload;
    },
    toggleBayCreationModal(state, action: PayloadAction<boolean>) {
      state.data.bayCreation = action.payload;
    },
    toggleProposalCreationModal(state, action: PayloadAction<boolean>) {
      state.data.proposalCreation = action.payload;
    },
    toggleInjectedConnectorErrorModal(state, action: PayloadAction<boolean>) {
      state.data.bayCreation = action.payload;
    },
    toggleTokenPairSelectionModal(state, action: PayloadAction<boolean>) {
      state.data.tokenPairSelection = action.payload;
    },
    toggleMyBaysSelectionModal(state, action: PayloadAction<boolean>) {
      state.data.myBaysSelectionModal = action.payload;
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
  toggleTokenPairSelectionModal,
  toggleMyBaysSelectionModal,
} = modalSlice.actions;

export default modalSlice.reducer;
