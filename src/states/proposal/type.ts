export type TransferProposalType = ProposalType & {
  amount: string;
  recipient: string;
  type: 'TRANSFER';
};

export type ExchangeProposalType = ProposalType & {
  type: 'EXCHANGE';
};

export type ProposalType = {
  address: string;
  createdAt: string;
  description: string;
  title: string;
  numberOfYesVotes: string;
  numberOfNoVotes: string;
  creator: string;
  votingDeadline: string;
  checkApprovalStatus: string;
};
