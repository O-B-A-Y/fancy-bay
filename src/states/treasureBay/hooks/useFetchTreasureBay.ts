import { useEffect, useState } from 'react';
import { TreasureBay } from 'src/types/TreasureBay';
import useTreasureBayContract from './useTreasureBayContract';
import { TreasureBayType } from '../types';
import { useAppSelector } from 'src/states/hooks';

export default function useFetchTreasureBay(address: string) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bay, setBay] = useState<TreasureBayType>();
  const [retries, setRetries] = useState(5);
  const {
    data: { environment },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { fetching },
  } = useAppSelector((state) => state.treasureBaySlice);

  useEffect(() => {
    const fetchTreasureBay = async () => {
      try {
        setLoading(true);
        const treasureBayContract = useTreasureBayContract(address);
        const treasureBayContractMethods: TreasureBay =
          treasureBayContract.methods;

        const [
          name,
          creator,
          stakeholders,
          treasureHunters,
          transferProposals,
          totalStakedAmount,
        ] = await Promise.all([
          treasureBayContractMethods.name().call(),
          treasureBayContractMethods.creator().call(),
          treasureBayContractMethods.listOfStakeholders().call(),
          treasureBayContractMethods.listOfTreasureHunters().call(),
          treasureBayContractMethods.getAllTransferProposals().call(),
          treasureBayContractMethods.totalStakedAmount().call(),
        ]);

        const treasureBay = {
          name,
          address,
          stakeholders,
          members: treasureHunters,
          transferProposals,
          creator: creator,
          exchangeProposals: [],
          totalValueLocked: totalStakedAmount,
        };

        setBay(treasureBay);
        setLoading(false);

        return;
      } catch (error: any) {
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

    fetchTreasureBay();
  }, [fetching, retries, environment]);

  return { bay, loading, error };
}
