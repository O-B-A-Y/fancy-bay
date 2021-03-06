import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/states/hooks';
import { TreasureBay } from 'src/types/TreasureBay';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import { setFetching, setTreasureBays } from '../slice';
import { TreasureBayType } from '../types';
import useTreasureBayContract from './useTreasureBayContract';
import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';

export default function useFetchTreasureBays() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bays, setBays] = useState<TreasureBayType[]>([]);
  const treasureBayFactoryContract = useTreasureBayFactoryContract();
  const [retries, setRetries] = useState(5);
  const {
    data: {
      environment: { account },
    },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { fetching },
  } = useAppSelector((state) => state.treasureBaySlice);

  useEffect(() => {
    const fetchTreasureBays = async () => {
      console.log('fetchTreasureBays');
      const treasureBayContractMethods: TreasureBayFactory =
        treasureBayFactoryContract.methods;
      try {
        setLoading(true);
        const treasureBayAddresses = await treasureBayContractMethods
          .getAllBays()
          .call();

        if (treasureBayAddresses.length === 0) {
          setBays([]);
          setError(null); // Clear error on success
          setLoading(false);
          return;
        } else {
          const treasureBays = await Promise.all(
            treasureBayAddresses.map(
              async (address): Promise<TreasureBayType> => {
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

                return {
                  name,
                  address,
                  stakeholders,
                  members: treasureHunters,
                  transferProposals,
                  creator: creator,
                  exchangeProposals: [],
                  totalValueLocked: totalStakedAmount,
                };
              }
            )
          );

          setBays(treasureBays);
          setError(null); // Clear error on success
          dispatch(setTreasureBays(treasureBays));
          dispatch(setFetching(false));
          setLoading(false);
        }

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

    fetchTreasureBays();
  }, [fetching, retries, account]);

  return { bays, loading, error, retries };
}
