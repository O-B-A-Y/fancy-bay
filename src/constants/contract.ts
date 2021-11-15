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
    TREASURE_BAY_FACTORY: '0xc2fD453FBdea10303baba7126eBC43Bd5abE7893',
  },
};
