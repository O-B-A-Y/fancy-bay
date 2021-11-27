import { useEffect, useState } from 'react';
import useObayTreasuryContract from '../../treasureBay/hooks/useObayTreasuryContract';
import { useAppSelector } from 'src/states/hooks';
import { ProposalType } from '../type';
import { ObayTreasury } from 'src/types/ObayTreasury';
import useProposalContract from './useProposalContract';
import { Proposal } from 'src/types/Proposal';

export default function useFetchTreasuryProposals() {
  console.log('fetchProposals');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [retries, setRetries] = useState(5);
  const {
    data: { environment },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { fetching },
  } = useAppSelector((state) => state.treasureBaySlice);
  const treasuryContract = useObayTreasuryContract();
  const treasuryContractMethods: ObayTreasury = treasuryContract.methods;

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const proposalAddresses = await treasuryContractMethods
          .getAllProposals()
          .call();

        if (proposalAddresses.length === 0) {
          setProposals([]);
          setLoading(false);
        }

        const proposals = await Promise.all(
          proposalAddresses.map(
            async (proposalAddress): Promise<ProposalType> => {
              const proposalContract = useProposalContract(proposalAddress);
              const transferProposalMethods: Proposal =
                proposalContract.methods;
              const [
                createdAt,
                description,
                title,
                numberOfYesVotes,
                numberOfNoVotes,
                creator,
                votingDeadline,
              ] = await Promise.all([
                transferProposalMethods.createdAt().call(),
                transferProposalMethods.description().call(),
                transferProposalMethods.title().call(),
                transferProposalMethods.numberOfYesVote().call(),
                transferProposalMethods.numberOfNoVote().call(),
                transferProposalMethods.creator().call(),
                transferProposalMethods.votingDeadline().call(),
              ]);

              return {
                address: proposalAddress,
                createdAt,
                description,
                title,
                numberOfYesVotes,
                numberOfNoVotes,
                creator,
                votingDeadline,
                checkApprovalStatus: `${
                  (numberOfYesVotes as any) /
                    ((numberOfYesVotes + numberOfNoVotes) as any) || 0
                }`,
              };
            }
          )
        );
        setProposals(proposals);
        setLoading(false);
        return;
      } catch (error: any) {
        setError(error.message);
        console.log(error);
        if (retries !== 0) {
          setTimeout(() => {
            setRetries(retries - 1);
          }, 1000);
        } else {
          setLoading(false);
        }
      }
    };

    fetchProposals();
  }, [fetching, retries, environment]);

  return { proposals, loading, error };
}
