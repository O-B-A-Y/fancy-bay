import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import { useEffect, useState } from 'react';
import { TreasureBay } from 'src/types/TreasureBay';
import useTreasureBayContract from './useTreasureBayContract';
import { useDispatch } from 'react-redux';
import { setFetching } from '../slice';
import { useAppSelector } from 'src/states/hooks';
import { MemberType } from '../types';
import useWeb3 from 'src/hooks/useWeb3';

export default function useFetchMember(
  bayAddress: string,
  memberAddress: string
) {
  const dispatch = useDispatch();
  const web3 = useWeb3();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState<MemberType>();
  const [retries, setRetries] = useState(5);
  const {
    data: { fetching },
  } = useAppSelector((state) => state.treasureBaySlice);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const treasureBayContract = useTreasureBayContract(bayAddress);
        const treasureBayContractMethods: TreasureBay =
          treasureBayContract.methods;
        const member = await treasureBayContractMethods
          .treasureHunters(memberAddress)
          .call();

        const stakeholder = await treasureBayContractMethods
          .stakeholders(memberAddress)
          .call();

        const { contractAddress, joinedAt } = member;
        const memberInfo = {
          contractAddress,
          joinedAt: parseInt(joinedAt) as any,
          balance: web3.utils.fromWei(stakeholder.balance, 'ether') || '0',
          claimedInterval: stakeholder.claimedInterval || '0',
        };

        console.log(memberInfo);

        setMember(memberInfo);
        dispatch(setFetching(false));
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

    fetchMembers();
  }, [fetching, retries]);

  return { member, loading, error };
}
