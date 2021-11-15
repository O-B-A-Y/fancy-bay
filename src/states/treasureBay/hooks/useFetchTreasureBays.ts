import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import { useEffect, useState } from 'react';
import { TreasureBay } from 'src/types/TreasureBay';
import useTreasureBayContract from './useTreasureBayContract';
import { TreasureBayType } from '../types';
import { useDispatch } from 'react-redux';
import { setTreasureBays } from '../slice';

export default function useFetchTreasureBays() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bays, setBays] = useState<TreasureBayType[]>([]);
  const treasureBayFactoryContract = useTreasureBayFactoryContract();
  const dispatch = useDispatch();
  const treasureBayContractMethods: TreasureBayFactory =
    treasureBayFactoryContract.methods;
  useEffect(() => {
    const fetchTreasureBays = async () => {
      try {
        setLoading(true);
        const treasureBayAddresses = await treasureBayContractMethods
          .getAllBays()
          .call();
        console.log(treasureBayAddresses);
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

            const [name, member, creator] = await Promise.all([
              treasureBayContractMethods.name().call(),
              treasureBayContractMethods.creator().call(),
              treasureBayContractMethods.getAllTransferProposals().call(),
              treasureBayContractMethods.totalNumberOfStakeholders().call(),
              treasureBayContractMethods.listOfTreasureHunters().call(),
            ]);

            return {
              name,
              address,
            };
          })
        );
        setBays(treasureBays);
        dispatch(setTreasureBays(treasureBays));
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
