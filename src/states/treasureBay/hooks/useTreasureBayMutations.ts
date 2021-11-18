import { useState } from 'react';
import useWeb3 from 'src/hooks/useWeb3';
import { useAppDispatch, useAppSelector } from 'src/states/hooks';
import { TreasureBay } from 'src/types/TreasureBay';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import Web3 from 'web3';
import { setFetching } from '../slice';
import useFetchTreasureBays from './useFetchTreasureBays';
import useTreasureBayContract from './useTreasureBayContract';
import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';

const useTreasureBayMutations = () => {
  const treasureBayFactoryContract = useTreasureBayFactoryContract();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.walletSlice);
  const factoryMethods: TreasureBayFactory = treasureBayFactoryContract.methods;
  const { bays } = useFetchTreasureBays();
  const web3 = useWeb3();
  const leaveTreasureBay = async (
    address: string,
    callback?: (success: boolean) => void
  ) => {
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
      return callback?.(true);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(error.message);
      setLoading(false);
      return callback?.(false);
    }
  };

  const createNewTreasureBay = async ({
    name,
    limitNumberOfStakeholders,
    limitNumberOfTreasureHunters,
    callback,
  }: {
    name: string;
    limitNumberOfStakeholders: string;
    limitNumberOfTreasureHunters: string;
    callback?: (success: boolean) => void;
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
        callback?.(false);
      }
    }
  };

  const stake = async (bayAddress: string, amount: string) => {
    setLoading(true);
    const treasureBayContract = useTreasureBayContract(bayAddress);
    const bayMethods: TreasureBay = treasureBayContract.methods;
    await bayMethods.stake().send({
      from: data.environment.account as string,
      value: web3.utils.toWei(amount),
    });
    setLoading(false);
  };

  const unstake = async (bayAddress: string) => {
    setLoading(true);
    const treasureBayContract = useTreasureBayContract(bayAddress);
    const bayMethods: TreasureBay = treasureBayContract.methods;
    await bayMethods.unstake().send({
      from: data.environment.account as string,
    });
    setLoading(false);
  };

  return { leaveTreasureBay, createNewTreasureBay, stake, unstake, loading };
};

export default useTreasureBayMutations;
