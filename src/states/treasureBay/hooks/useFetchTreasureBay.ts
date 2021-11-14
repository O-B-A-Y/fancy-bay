import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import { useEffect, useState } from 'react';
import { TreasureBay } from 'src/types/TreasureBay';
import useTreasureBayContract from './useTreasureBayContract';
import { TreasureBayType } from '../types';

export default function useFetchTreasureBay() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bays, setBays] = useState<TreasureBayType[]>([]);
  const treasureBayFactoryContract = useTreasureBayFactoryContract();
  const treasureBayContractMethods: TreasureBayFactory =
    treasureBayFactoryContract.methods;

  useEffect(() => {
    const fetchTreasureBays = async () => {
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
          treasureBayAddresses.map(async (address) => {
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
        setLoading(false);
        return;
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTreasureBays();
  }, []);

  return { bays, loading, error };
}
