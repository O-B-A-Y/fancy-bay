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
  ObayTreasury,
  ObayTreasuryMethodNames,
  ObayTreasuryEventsContext,
  ObayTreasuryEvents
>;
export type ObayTreasuryEvents =
  | 'NewPoolCreated'
  | 'NewProposalAdded'
  | 'NewStakeholder'
  | 'OwnershipTransferred'
  | 'RemoveStakeholder'
  | 'Stake'
  | 'Unstake';
export interface ObayTreasuryEventsContext {
  NewPoolCreated(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  NewProposalAdded(
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
}
export type ObayTreasuryMethodNames =
  | 'new'
  | 'admin'
  | 'claim'
  | 'createStakeholder'
  | 'getAllProposals'
  | 'getProposal'
  | 'limitNumberOfStakeholders'
  | 'listOfStakeholders'
  | 'minimumStakedAmount'
  | 'numberOfStakeholders'
  | 'owner'
  | 'removeStakeholder'
  | 'renounceOwnership'
  | 'stake'
  | 'stakeholders'
  | 'token'
  | 'totalNumberOfStakeholders'
  | 'totalStakedAmount'
  | 'transferOwnership'
  | 'unstake'
  | 'createNewProposal'
  | 'stakeNative'
  | 'unstakeNative';
export interface NewPoolCreatedEventEmittedResponse {
  owner: string;
  lockedAmount: string;
}
export interface NewProposalAddedEventEmittedResponse {
  _title: string;
  _sourceAddress: string;
}
export interface NewStakeholderEventEmittedResponse {
  stakeholder: string;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
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
export interface StakeholderResponse {
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
export interface ObayTreasury {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  admin(): MethodConstantReturnContext<string>;
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
  getAllProposals(): MethodConstantReturnContext<string[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _proposalAddress Type: address, Indexed: false
   */
  getProposal(_proposalAddress: string): MethodConstantReturnContext<string>;
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
   */
  listOfStakeholders(): MethodConstantReturnContext<StakeholderResponse[]>;
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
   * @param stakeholder Type: address, Indexed: false
   */
  removeStakeholder(stakeholder: string): MethodReturnContext;
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
  token(): MethodConstantReturnContext<string>;
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
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  unstake(): MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _title Type: string, Indexed: false
   * @param _description Type: string, Indexed: false
   * @param _debatingPeriod Type: uint64, Indexed: false
   */
  createNewProposal(
    _title: string,
    _description: string,
    _debatingPeriod: string
  ): MethodReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  stakeNative(): MethodPayableReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   */
  unstakeNative(): MethodPayableReturnContext;
}
