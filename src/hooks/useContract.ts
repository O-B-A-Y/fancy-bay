/* eslint-disable no-console */
import { Contract } from 'ethers';
import { useMemo } from 'react';
import ContractFunc from 'src/functions/contract';
import { useAppSelector } from 'src/states/hooks';
import useActiveWeb3React from './useActiveWeb3React';

export default function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { data } = useAppSelector((state) => state.walletSlice);
  const { library, account } = useActiveWeb3React();
  const contract: any = new Contract(address as any, ABI);

  return useMemo(() => {
    if (data.environment.isDevelopment) return contract;
    if (!address || !ABI || !library) return null;
    try {
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
