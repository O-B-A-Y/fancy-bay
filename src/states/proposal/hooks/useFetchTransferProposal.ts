import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/states/hooks';
import useTransferProposalContract from './useTransferProposalContract';
import { TransferProposal } from 'src/types/TransferProposal';
import { TransferProposalType } from '../type';

export default function useFetchTransferProposal(proposalAddress: string) {
  console.log('fetchTransferProposal');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transferProposal, setTransferProposal] =
    useState<TransferProposalType>();
  const [retries, setRetries] = useState(5);
  const {
    data: { environment },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { fetching },
  } = useAppSelector((state) => state.treasureBaySlice);

  useEffect(() => {
    const fetchTransferProposal = async () => {
      try {
        setLoading(true);
        const transferProposalContract =
          useTransferProposalContract(proposalAddress);
        const transferProposalMethods: TransferProposal =
          transferProposalContract.methods;
        const [
          amount,
          createdAt,
          description,
          title,
          numberOfYesVotes,
          numberOfNoVotes,
          creator,
          recipient,
          votingDeadline,
        ] = await Promise.all([
          transferProposalMethods.amount().call(),
          transferProposalMethods.createdAt().call(),
          transferProposalMethods.description().call(),
          transferProposalMethods.title().call(),
          transferProposalMethods.numberOfYesVote().call(),
          transferProposalMethods.numberOfNoVote().call(),
          transferProposalMethods.creator().call(),
          transferProposalMethods.recipient().call(),
          transferProposalMethods.votingDeadline().call(),
        ]);

        const transferProposal: TransferProposalType = {
          address: proposalAddress,
          type: 'TRANSFER',
          amount,
          createdAt,
          description,
          title,
          numberOfYesVotes,
          numberOfNoVotes,
          creator,
          recipient,
          votingDeadline,
          checkApprovalStatus: `${
            (numberOfYesVotes as any) /
              ((numberOfYesVotes + numberOfNoVotes) as any) || 0
          }`,
        };

        setTransferProposal(transferProposal);
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

    fetchTransferProposal();
  }, [fetching, retries, environment]);

  return { transferProposal, loading, error };
}
