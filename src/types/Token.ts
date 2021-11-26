export interface TokenDetails {
  chainId: number; // 1 for ETH Mainnet, 3 for ETH Ropsten Testnet, 4 for Rinkeby Testnet
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  tags?: string[];
}

export interface NativeCurrencyDetails {
  chainId: number; // 1 for ETH Mainnet, 3 for ETH Ropsten Testnet, 4 for Rinkeby Testnet
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
}

/* 
  Token metadata complied to the specifications of Uniswap
  which can be utilized for any dApps (ref: https://github.com/Uniswap/token-lists)
*/
export interface TokenMetadata {
  name: string;
  logoURI: string;
  keywords?: string[];
  tags?: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
  timestamp?: string;
  tokens: TokenDetails[];
  version: {
    major: number;
    minor: number;
    patch: number;
  };
}
