import { ENVIRONMENT } from './token';

export enum ListOfContracts {
  TREASURE_BAY_FACTORY = 'TREASURE_BAY_FACTORY',
  TREASURE_TRANSFER_CHEST = 'TREASURE_TRANSFER_CHEST',
  TREASURE_POOL = 'TREASURE_POOL',
}

export const ContractMapAddress: {
  [key in keyof typeof ENVIRONMENT]: {
    [contractKey in keyof typeof ListOfContracts]: string;
  };
} = {
  PRODUCTION: {
    TREASURE_BAY_FACTORY: '',
    TREASURE_TRANSFER_CHEST: '',
    TREASURE_POOL: '',
  },
  DEVELOPMENT: {
    TREASURE_BAY_FACTORY: '0xCd9eb1be4c714524bb5470b1b94C9059aA97e887',
    TREASURE_TRANSFER_CHEST: '0xcf5Eab1E08be73d31ccF096d7A65B05A536eb05c',
    TREASURE_POOL: '0xA45e331E0D9aBcD2f42873710D79e44cABBF139B',
  },
};
