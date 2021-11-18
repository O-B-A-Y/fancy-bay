import { useEffect, useState } from 'react';
import { TreasureBay } from 'src/types/TreasureBay';
import useTreasureBayContract from './useTreasureBayContract';
import { useDispatch } from 'react-redux';
import { setFetching } from '../slice';
import { useAppSelector } from 'src/states/hooks';
import { MemberType } from '../types';
import useWeb3 from 'src/hooks/useWeb3';

export default function useFetchMembers(bayAddress: string) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [retries, setRetries] = useState(5);
  const web3 = useWeb3();
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

        const [members] = await Promise.all([
          treasureBayContractMethods.listOfTreasureHunters().call(),
        ]);
        const mappedMembers = await Promise.all(
          members.map(async (member) => {
            const stakeholder = await treasureBayContractMethods
              .stakeholders(member.contractAddress)
              .call();

            const { contractAddress, joinedAt } = member;
            return {
              contractAddress,
              joinedAt: parseInt(joinedAt) as any,
              balance: web3.utils.fromWei(stakeholder.balance, 'ether') || '0',
              claimedInterval: stakeholder.claimedInterval || '0',
            };
          })
        );

        setMembers(mappedMembers);
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

  return { members, loading, error };
}
