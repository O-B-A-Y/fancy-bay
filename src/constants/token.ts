export type TokenAllowed = 'OBAY' | 'ETH';
export interface Token {
  name: string;
  balance: string;
  decimals: number;
  symbol: string;
  address: string;
}
