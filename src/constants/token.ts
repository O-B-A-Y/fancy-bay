export type TokenAllowed = 'OBAY';
export interface Token {
  name: string;
  balance: string;
  decimals: number;
  symbol: string;
  address: string;
}

export type TokenMapAddressType = {
  [key in TokenAllowed]: string;
};

export enum ENVIRONMENT {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
}

export const TokenMapAddress: {
  [key in keyof typeof ENVIRONMENT]: TokenMapAddressType;
} = {
  PRODUCTION: {
    OBAY: '0xe26d20Ef036bAa1200a639ac5E0ccA0804027789',
  },
  DEVELOPMENT: {
    OBAY: process.env.OBAY_TOKEN_CONTRACT_ADDRESS,
  },
};
