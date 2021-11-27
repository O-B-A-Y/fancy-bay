import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/states/hooks';
import { ProposalType } from '../type';
import { Proposal } from 'src/types/Proposal';
import useProposalContract from './useProposalContract';

export default function useFetchProposal(proposalAddress: string) {
  console.log('fetchProposal');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<ProposalType>();
  const [retries, setRetries] = useState(5);
  const {
    data: { environment },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { fetching },
  } = useAppSelector((state) => state.treasureBaySlice);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        setLoading(true);
        const proposalContract = useProposalContract(proposalAddress);
        const proposalContractMethods: Proposal = proposalContract.methods;
        const [
          createdAt,
          description,
          title,
          numberOfYesVotes,
          numberOfNoVotes,
          creator,
          votingDeadline,
        ] = await Promise.all([
          proposalContractMethods.createdAt().call(),
          proposalContractMethods.description().call(),
          proposalContractMethods.title().call(),
          proposalContractMethods.numberOfYesVote().call(),
          proposalContractMethods.numberOfNoVote().call(),
          proposalContractMethods.creator().call(),
          proposalContractMethods.votingDeadline().call(),
        ]);

        const proposal: ProposalType = {
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

        setProposal(proposal);
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

    fetchProposal();
  }, [fetching, retries, environment]);

  return { proposal, loading, error };
}
