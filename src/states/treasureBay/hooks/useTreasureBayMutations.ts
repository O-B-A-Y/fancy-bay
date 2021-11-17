import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/states/hooks';
import { TreasureBay } from 'src/types/TreasureBay';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import { setFetching } from '../slice';
import useFetchTreasureBays from './useFetchTreasureBays';
import useTreasureBayContract from './useTreasureBayContract';
import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';

const useTreasureBayMutations = ({
  callback,
}: {
  callback?: (success: boolean) => void;
}) => {
  const treasureBayFactoryContract = useTreasureBayFactoryContract();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.walletSlice);
  const factoryMethods: TreasureBayFactory = treasureBayFactoryContract.methods;
  const { bays } = useFetchTreasureBays();
  const leaveTreasureBay = async (address: string) => {
    try {
      setLoading(true);
      if (data.environment.account) {
        const treasureBayContract = useTreasureBayContract(address);
        const bayMethods: TreasureBay = treasureBayContract.methods;

        console.log(bayMethods);

        // await bayMethods.leaveBay().send({
        //   from: data.environment.account as string,
        // });

        const listOfTreasureHunters = await bayMethods
          .listOfTreasureHunters()
          .call();
        if (listOfTreasureHunters.length === 0) {
          await factoryMethods.deleteBay(address).send({
            from: data.environment.account as string,
          });
        }
      }
      setLoading(false);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error.message);
      setLoading(false);
    }
  };

  const createNewTreasureBay = async ({
    name,
    limitNumberOfStakeholders,
    limitNumberOfTreasureHunters,
  }: {
    name: string;
    limitNumberOfStakeholders: string;
    limitNumberOfTreasureHunters: string;
  }) => {
    if (data.environment.account) {
      try {
        setLoading(true);
        const listOfBayName = bays.map((bay) => bay.name);
        if (listOfBayName.includes(name)) {
          alert('Treasure bay name is used already');
        } else {
          const response: any = await factoryMethods
            .createNewBay(
              name,
              limitNumberOfStakeholders,
              limitNumberOfTreasureHunters
            )
            .send({
              from: data.environment.account,
            });
          console.log(response.events.NewBayCreated);
          if (response.events.NewBayCreated) {
            const treasureBayContract = useTreasureBayContract(
              response.events.NewBayCreated.returnValues.bayAddress
            );
            const method: TreasureBay = treasureBayContract.methods;
            await method.createTreasureHunter().send({
              from: data.environment.account,
            });
            dispatch(setFetching(true));
          }
          callback?.(true);
        }
        setLoading(false);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.error(error.message);
        setLoading(false);
      }
    }
  };

  return { leaveTreasureBay, createNewTreasureBay, loading };
};

export default useTreasureBayMutations;
