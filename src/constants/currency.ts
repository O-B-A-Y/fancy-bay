/* eslint-disable import/prefer-default-export */

import { ChainId } from '@sushiswap/sdk';
import { DevelopmentChainId } from '../connectors';
import { NativeCurrencyDetails } from '../types/Token';

/* * Details of Native Currency in Ethereum blockchain * */
export const nativeCurrency: { [key: number]: NativeCurrencyDetails } = {
  [ChainId.MAINNET]: {
    chainId: 1,
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
    logoURI: 'ipfs://QmXtMayDwgVLDuDhzy89uw27bY9cRtVJXecTUcCksPZgsV',
  },
  [DevelopmentChainId.OPTION_2]: {
    chainId: 1,
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
    logoURI: 'ipfs://QmXtMayDwgVLDuDhzy89uw27bY9cRtVJXecTUcCksPZgsV',
  },
};
