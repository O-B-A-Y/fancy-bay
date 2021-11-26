import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/states/hooks';
import { TreasureBay } from 'src/types/TreasureBay';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import { setFetching, setYourBays } from '../slice';
import { TreasureBayType } from '../types';
import useTreasureBayContract from './useTreasureBayContract';
import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';

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
          setError(null); // Clear error
          setLoading(false);
          return;
        } else {
          let filterTreasureBays: string[] = [];
          for (let index = 0; index < treasureBayAddresses.length; index++) {
            const treasureBayContract = useTreasureBayContract(
              treasureBayAddresses[index]
            );
            const treasureBayContractMethods: TreasureBay =
              treasureBayContract.methods;

            const treasureHunters = await treasureBayContractMethods
              .listOfTreasureHunters()
              .call();
            if (
              treasureHunters.some(
                (hunter) => hunter.contractAddress === account
              )
            ) {
              filterTreasureBays.push(treasureBayAddresses[index]);
            }
          }
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
          setError(null); // Clear error
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
  }, [fetching, retries, account]);

  return { bays, loading, error, retries };
}
