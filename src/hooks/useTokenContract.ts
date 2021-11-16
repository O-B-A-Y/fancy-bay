import ERC20_ABI from '../contracts/ERC20.json';
import useWeb3Contract from './useWeb3Contract';

export default function useTokenContract(tokenAddress: string) {
  return useWeb3Contract(tokenAddress, ERC20_ABI.abi);
}
