import { Contract } from 'ethers';
import useContract from './useContract';
import ERC20_ABI from '../constants/abis/erc20.json';

export default function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
