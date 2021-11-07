import { Contract } from 'ethers';
import { useMemo } from 'react';
import ContractFunc from 'src/functions/contract';
import useActiveWeb3React from './useActiveWeb3React';

export default function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      /** Using the custom function to get the contract based on the given arguments
       * @string address
       * @json abi
       * @provider library
       * @boolean withSignerIfPossible
       */
      return ContractFunc.getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}
