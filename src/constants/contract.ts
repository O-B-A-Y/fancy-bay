import { ENVIRONMENT } from './token';

export enum ListOfContracts {
  TREASURE_BAY_FACTORY = 'TREASURE_BAY_FACTORY',
  // TREASURE_TRANSFER_CHEST = 'TREASURE_TRANSFER_CHEST',
  // TREASURE_POOL = 'TREASURE_POOL',
}

export const ContractMapAddress: {
  [key in keyof typeof ENVIRONMENT]: {
    [contractKey in keyof typeof ListOfContracts]: string;
  };
} = {
  PRODUCTION: {
    TREASURE_BAY_FACTORY: '',
  },
  DEVELOPMENT: {
    TREASURE_BAY_FACTORY: '0x583a12c59aa5A64714c3A2E990FbCFd48550b6fc',
  },
};
