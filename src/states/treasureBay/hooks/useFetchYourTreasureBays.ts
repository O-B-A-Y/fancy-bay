import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import { useEffect, useState } from 'react';
import { TreasureBay } from 'src/types/TreasureBay';
import useTreasureBayContract from './useTreasureBayContract';
import { TreasureBayType } from '../types';
import { useDispatch } from 'react-redux';
import { setFetching, setYourBays } from '../slice';
import { useAppSelector } from 'src/states/hooks';

export default function useFetchYourTreasureBays() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bays, setBays] = useState<TreasureBayType[]>([]);
  const [retries, setRetries] = useState(5);
  const {
    data: {
      environment: { account },
    },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { fetching },
  } = useAppSelector((state) => state.treasureBaySlice);
  const treasureBayFactoryContract = useTreasureBayFactoryContract();

  const treasureBayContractMethods: TreasureBayFactory =
    treasureBayFactoryContract.methods;

  useEffect(() => {
    const fetchYourTreasureBays = async () => {
      try {
        setLoading(true);
        const treasureBayAddresses = await treasureBayContractMethods
          .getAllBays()
          .call();
        if (treasureBayAddresses.length === 0) {
          setBays([]);
          setLoading(false);
          return;
        } else {
          const filterTreasureBays = treasureBayAddresses.filter(
            async (address) => {
              const treasureBayContract = useTreasureBayContract(address);
              const treasureBayContractMethods: TreasureBay =
                treasureBayContract.methods;

              const creator = await treasureBayContractMethods.creator().call();
              console.log(creator, account);
              return creator === account;
            }
          );
          console.log(filterTreasureBays);
          const treasureBays = await Promise.all(
            filterTreasureBays.map(async (address) => {
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
            })
          );

          setBays(treasureBays);
          dispatch(setYourBays(treasureBays));
          dispatch(setFetching(false));
          setLoading(false);
          return;
        }
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

    fetchYourTreasureBays();
  }, [fetching, retries]);

  return { bays, loading, error };
}
