import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import { useEffect, useState } from 'react';
import { TreasureBay } from 'src/types/TreasureBay';
import useTreasureBayContract from './useTreasureBayContract';
import { TreasureBayType } from '../types';
import { useDispatch } from 'react-redux';
import { setYourBays } from '../slice';
import { useAppSelector } from 'src/states/hooks';

export default function useFetchYourTreasureBays() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bays, setBays] = useState<TreasureBayType[]>([]);
  const {
    data: {
      environment: { account },
    },
  } = useAppSelector((state) => state.walletSlice);
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
        }
        const treasureBays = await Promise.all(
          treasureBayAddresses
            .filter(async (address) => {
              const treasureBayContract = useTreasureBayContract(address);
              const treasureBayContractMethods: TreasureBay =
                treasureBayContract.methods;

              const creator = await treasureBayContractMethods.creator().call();
              return creator === account;
            })
            .map(async (address) => {
              const treasureBayContract = useTreasureBayContract(address);
              const treasureBayContractMethods: TreasureBay =
                treasureBayContract.methods;

              const [name] = await Promise.all([
                treasureBayContractMethods.name().call(),
              ]);
              return {
                name,
                address,
              };
            })
        );

        setBays(treasureBays);
        dispatch(setYourBays(treasureBays));
        setLoading(false);
        return;
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchYourTreasureBays();
  }, []);

  return { bays, loading, error };
}
