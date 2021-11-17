import { TransferProposal } from 'src/types/TransferProposal';
import {
  StakeholderResponse,
  TreasurehunterResponse,
} from 'src/types/TreasureBay';

export interface TreasureBayType {
  name: string;
  address: string;
  members: TreasurehunterResponse[];
  stakeholders: StakeholderResponse[];
  creator: string;
  totalValueLocked: string;
  transferProposals: string[];
  exchangeProposals: any;
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
