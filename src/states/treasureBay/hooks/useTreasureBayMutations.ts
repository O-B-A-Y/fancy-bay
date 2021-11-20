import { useState } from 'react';
import useWeb3 from 'src/hooks/useWeb3';
import { useAppDispatch, useAppSelector } from 'src/states/hooks';
import useTransferProposalContract from 'src/states/proposal/hooks/useTransferProposalContract';
import { TransferProposal } from 'src/types/TransferProposal';
import { TreasureBay } from 'src/types/TreasureBay';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
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

  const voteTransferProposal = (proposalAddress: string, isYes: boolean) => {
    const transferProposalContract =
      useTransferProposalContract(proposalAddress);
    const transferProposalMethods: TransferProposal =
      transferProposalContract.methods;
    if (isYes) {
      transferProposalMethods.voteYes().send({
        from: data.environment.account as string,
      });
    } else {
      transferProposalMethods.voteNo().send({
        from: data.environment.account as string,
      });
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
            join(response.events.NewBayCreated.returnValues.bayAddress, false);
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

  const join = async (bayAddress: string, loading: boolean) => {
    if (loading) {
      setLoading(true);
    }
    const treasureBayContract = useTreasureBayContract(bayAddress);
    const bayMethods: TreasureBay = treasureBayContract.methods;
    await bayMethods.createTreasureHunter().send({
      from: data.environment.account as string,
    });
    dispatch(setFetching(true));
    if (loading) {
      setLoading(false);
    }
  };

  const leave = async (bayAddress: string) => {
    setLoading(true);
    const treasureBayContract = useTreasureBayContract(bayAddress);
    const bayMethods: TreasureBay = treasureBayContract.methods;
    // TODO implement leave bay
    setLoading(false);
  };

  const createNewTransferProposal = async (
    bayAddress: string,
    args: {
      _title: string;
      _description: string;
      _debatingPeriod: string;
      _recipient: string;
      _amount: string;
    }
  ) => {
    setLoading(true);
    const treasureBayContract = useTreasureBayContract(bayAddress);
    const bayMethods: TreasureBay = treasureBayContract.methods;
    console.log(args);
    await bayMethods
      .createNewTransferProposal(
        args._title,
        args._description,
        args._debatingPeriod,
        args._recipient,
        web3.utils.toWei(args._amount, 'ether')
      )
      .send({
        from: data.environment.account as string,
      });
    dispatch(setFetching(true));
    setLoading(false);
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

  return {
    leaveTreasureBay,
    createNewTreasureBay,
    createNewTransferProposal,
    voteTransferProposal,
    stake,
    unstake,
    loading,
    leave,
    join,
  };
};

export default useTreasureBayMutations;
