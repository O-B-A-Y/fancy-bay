import {
  StakeholderResponse,
  TreasurehunterResponse,
} from 'src/types/TreasureBay';

export interface TreasureBayType {
  name: string;
  createdAt: string;
  address: string;
  members: TreasurehunterResponse[];
  stakeholders: StakeholderResponse[];
  creator: string;
  totalValueLocked: string;
  transferProposals: string[];
  exchangeProposals: any;
}

export interface TreasuryType {
  proposals: string[];
  address: string;
  stakeholders: StakeholderResponse[];
  totalValueLocked: string;
}

export interface CreateNewBayArguments {
  name: string;
  limitNumberOfTreasureHunters: string;
  limitNumberOfStakeholders: string;
}

export interface MemberType {
  contractAddress: string;
  joinedAt: string;
  balance: string;
  claimedInterval: string;
}
