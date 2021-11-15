import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  TreasureBay,
  TreasureBayMethodNames,
  TreasureBayEventsContext,
  TreasureBayEvents
>;
export type TreasureBayEvents =
  | 'NewPoolCreated'
  | 'NewStakeholder'
  | 'NewTransferProposalAdded'
  | 'NewTreasureHunter'
  | 'OwnershipTransferred'
  | 'ProposalAdded'
  | 'RemoveStakeholder'
  | 'Stake'
  | 'Unstake'
  | 'Voted';
export interface TreasureBayEventsContext {
  NewPoolCreated(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  NewStakeholder(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  NewTransferProposalAdded(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  NewTreasureHunter(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  OwnershipTransferred(
    parameters: {
      filter?: {
        previousOwner?: string | string[];
        newOwner?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  ProposalAdded(
    parameters: {
      filter?: { proposalID?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  RemoveStakeholder(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Stake(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Unstake(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Voted(
    parameters: {
      filter?: { proposalID?: string | string[]; voter?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
}
export type TreasureBayMethodNames =
  | 'new'
  | 'admin'
  | 'allowedRecipients'
  | 'claim'
  | 'createStakeholder'
  | 'daoAddress'
  | 'exchangeProposals'
  | 'getAllTransferProposals'
  | 'getTransferProposal'
  | 'limitNumberOfStakeholders'
  | 'listOfStakeholders'
  | 'minimumStakedAmount'
  | 'numberOfStakeholders'
  | 'owner'
  | 'renounceOwnership'
  | 'stake'
  | 'stakeholders'
  | 'totalNumberOfStakeholders'
  | 'totalStakedAmount'
  | 'transferOwnership'
  | 'treasureHunters'
  | 'unstake'
  | 'name'
  | 'creator'
  | 'limitNumberOfTreasureHunters'
  | 'listOfTreasureHunters'
  | 'createTreasureHunter'
  | 'toggleIsActivated'
  | 'createNewTransferProposal';
export interface NewPoolCreatedEventEmittedResponse {
  owner: string;
  lockedAmount: string;
}
export interface NewStakeholderEventEmittedResponse {
  stakeholder: string;
}
export interface NewTransferProposalAddedEventEmittedResponse {
  _title: string;
  _sourceAddress: string;
  _destinationAddress: string;
  _amount: string;
}
export interface NewTreasureHunterEventEmittedResponse {
  treasureHunter: string;
  timestamp: string;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface ProposalAddedEventEmittedResponse {
  proposalID: string;
  recipient: string;
  amount: string;
  description: string;
}
export interface RemoveStakeholderEventEmittedResponse {
  stakeholder: string;
}
export interface StakeEventEmittedResponse {
  stakeholder: string;
  amount: string;
}
export interface UnstakeEventEmittedResponse {
  stakeholder: string;
  amount: string;
}
export interface VotedEventEmittedResponse {
  proposalID: string;
  position: boolean;
  voter: string;
}
export interface StakeholderResponse {
  balance: string;
  contractAddress: string;
  claimedInterval: string;
  joinedAt: string;
}
export interface ListOfStakeholdersResponse {
  balance: string;
  contractAddress: string;
  claimedInterval: string;
  joinedAt: string;
}
export interface StakeholdersResponse {
  balance: string;
  contractAddress: string;
  claimedInterval: string;
  joinedAt: string;
}
export interface TreasureHuntersResponse {
  contractAddress: string;
  joinedAt: string;
}
export interface TreasurehunterResponse {
  contractAddress: string;
  joinedAt: string;
}
export interface TreasureBay {
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: constructor
   * @param name_ Type: string, Indexed: false
   * @param limitNumberOfStakeholders_ Type: uint64, Indexed: false
   * @param limitNumberOfTreasureHunters_ Type: uint64, Indexed: false
   */
  'new'(
    name_: string,
    limitNumberOfStakeholders_: string,
    limitNumberOfTreasureHunters_: string
  ): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  admin(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  allowedRecipients(parameter0: string): MethodConstantReturnContext<boolean>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  claim(): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  createStakeholder(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  daoAddress(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  exchangeProposals(parameter0: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllTransferProposals(): MethodConstantReturnContext<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _proposalAddress Type: address, Indexed: false
   */
  getTransferProposal(
    _proposalAddress: string
  ): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  limitNumberOfStakeholders(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  listOfStakeholders(
    parameter0: string
  ): MethodConstantReturnContext<ListOfStakeholdersResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  minimumStakedAmount(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  numberOfStakeholders(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(): MethodReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  stake(): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  stakeholders(
    parameter0: string
  ): MethodConstantReturnContext<StakeholdersResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalNumberOfStakeholders(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalStakedAmount(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  treasureHunters(
    parameter0: string
  ): MethodConstantReturnContext<TreasureHuntersResponse>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  unstake(): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  creator(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  limitNumberOfTreasureHunters(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  listOfTreasureHunters(): MethodConstantReturnContext<
    TreasurehunterResponse[]
  >;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  createTreasureHunter(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param isActivated_ Type: bool, Indexed: false
   */
  toggleIsActivated(isActivated_: boolean): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _title Type: string, Indexed: false
   * @param _description Type: string, Indexed: false
   * @param _debatingPeriod Type: uint64, Indexed: false
   * @param _recipient Type: address, Indexed: false
   * @param _amount Type: uint256, Indexed: false
   */
  createNewTransferProposal(
    _title: string,
    _description: string,
    _debatingPeriod: string,
    _recipient: string,
    _amount: string
  ): MethodReturnContext;
}
