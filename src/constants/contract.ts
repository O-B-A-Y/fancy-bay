import { ENVIRONMENT } from './token';

export enum ListOfContracts {
  TREASURE_BAY_FACTORY = 'TREASURE_BAY_FACTORY',
  OBAY_TREASURY = 'OBAY_TREASURY',
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
    OBAY_TREASURY: '',
  },
  DEVELOPMENT: {
    TREASURE_BAY_FACTORY: process.env.TREASURE_BAY_FACTORY_CONTRACT_ADDRESS,
    OBAY_TREASURY: '0xA549cb5Fa013999F67347602bbD1840a7Cd8612d',
  },
};
