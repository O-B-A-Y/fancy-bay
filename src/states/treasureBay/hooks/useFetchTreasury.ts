import { useEffect, useState } from 'react';
import useObayTreasuryContract from './useObayTreasuryContract';
import { TreasuryType } from '../types';
import { useAppSelector } from 'src/states/hooks';
import { ObayTreasury } from 'src/types/ObayTreasury';
import useWeb3Environment from 'src/hooks/useWeb3Environment';
import { ContractMapAddress } from 'src/constants/contract';

export default function useFetchTreasury() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [treasury, setTreasury] = useState<TreasuryType>();
  const [retries, setRetries] = useState(5);
  const {
    data: { environment },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { fetching },
  } = useAppSelector((state) => state.treasureBaySlice);
  const treasuryContract = useObayTreasuryContract();
  const web3Environment = useWeb3Environment();
  const treasuryContractMethods: ObayTreasury = treasuryContract.methods;
  useEffect(() => {
    const fetchTreasury = async () => {
      console.log('fetchTreasury');
      try {
        setLoading(true);

        const [stakeholders, proposals, totalValueLocked] = await Promise.all([
          treasuryContractMethods.listOfStakeholders().call(),
          treasuryContractMethods.getAllProposals().call(),
          treasuryContractMethods.totalStakedAmount().call(),
        ]);

        const treasury = {
          address: ContractMapAddress[web3Environment].OBAY_TREASURY,
          stakeholders,
          proposals,
          totalValueLocked,
        };
        setTreasury(treasury);
        setLoading(false);

        return;
      } catch (error: any) {
        console.log(error);
        setError(error.message);
        if (retries !== 0) {
          setTimeout(() => {
            setRetries(retries - 1);
          }, 1000);
        } else {
          setLoading(false);
        }
      }
    };

    fetchTreasury();
  }, [fetching, retries, environment]);

  return { treasury, loading, error };
}
