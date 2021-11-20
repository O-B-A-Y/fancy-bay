import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';
import { TransferProposalType } from './type';

const PROPOSAL_NAME = 'PROPOSAL';
export const PROPOSAL_ACTION_CREATE_NEW_PROPOSAL = `${PROPOSAL_NAME}/CREATE_NEW_BAY`;
export const PROPOSAL_ACTION_FETCH_PROPOSAL = `${PROPOSAL_NAME}/FETCH_PROPOSAL`;

interface ProposalState {
  status: ThunkFetchState;
  data: {
    fetching: boolean;
    selectedTransferProposal: TransferProposalType;
  };
  error: null | object | string;
}

const initialState: ProposalState = {
  status: ThunkFetchState.Idle,
  data: {
    fetching: false,
    selectedTransferProposal: {
      amount: '',
      checkApprovalStatus: '',
      createdAt: '',
      creator: '',
      description: '',
      numberOfNoVotes: '',
      numberOfYesVotes: '',
      recipient: '',
      title: '',
      type: 'TRANSFER',
      votingDeadline: '',
    },
  },
  error: null,
};

const proposalSlice = createSlice({
  name: PROPOSAL_NAME,
  initialState,
  reducers: {
    setFetching(state, action: PayloadAction<boolean>) {
      state.data.fetching = action.payload;
    },
    setSelectedProposal(state, action: PayloadAction<TransferProposalType>) {
      state.data.selectedTransferProposal = action.payload;
    },
  },
});

export const { setFetching, setSelectedProposal } = proposalSlice.actions;

export default proposalSlice.reducer;
