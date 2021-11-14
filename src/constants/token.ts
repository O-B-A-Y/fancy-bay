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
    OBAY: '0x0CA7426b7A8c0C954FC2B511DEc0A1FA0C9e3137',
  },
};
