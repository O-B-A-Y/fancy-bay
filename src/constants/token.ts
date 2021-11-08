import { ChainId } from '@sushiswap/sdk';

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

export const TokenMapAddress: TokenMapAddressType = {
  OBAY: '0xe26d20Ef036bAa1200a639ac5E0ccA0804027789',
};
