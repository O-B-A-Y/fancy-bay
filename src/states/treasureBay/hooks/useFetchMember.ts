import useTreasureBayFactoryContract from './useTreasureBayFactoryContract';
import { TreasureBayFactory } from 'src/types/TreasureBayFactory';
import { useEffect, useState } from 'react';
import { TreasureBay } from 'src/types/TreasureBay';
import useTreasureBayContract from './useTreasureBayContract';
import { useDispatch } from 'react-redux';
import { setFetching } from '../slice';
import { useAppSelector } from 'src/states/hooks';
import { MemberType } from '../types';

export default function useFetchMember(memberAddress: string) {
  const dispatch = useDispatch();
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
        const treasureBayContract = useTreasureBayContract(memberAddress);
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
          balance: stakeholder.balance || '0',
          claimedInterval: stakeholder.claimedInterval || '0',
        };

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
