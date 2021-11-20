export type TransferProposalType = {
  address: string;
  amount: string;
  createdAt: string;
  description: string;
  title: string;
  numberOfYesVotes: string;
  numberOfNoVotes: string;
  creator: string;
  recipient: string;
  votingDeadline: string;
  checkApprovalStatus: string;
  type: 'EXCHANGE' | 'TRANSFER';
};

export type ExchangeProposalType = {
  createdAt: string;
  description: string;
  title: string;
  numberOfYesVotes: string;
  numberOfNoVotes: string;
  creator: string;
  votingDeadline: string;
  checkApprovalStatus: string;
  type: 'EXCHANGE' | 'TRANSFER';
};

export type ProposalType = TransferProposalType | ExchangeProposalType;
