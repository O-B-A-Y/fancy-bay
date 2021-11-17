import { useEffect, useState } from 'react';
import { TreasureBay } from 'src/types/TreasureBay';
import useTreasureBayContract from '../../treasureBay/hooks/useTreasureBayContract';
import { useAppSelector } from 'src/states/hooks';
import useTransferProposalContract from './useTransferProposalContract';
import { TransferProposal } from 'src/types/TransferProposal';
import { TransferProposalType } from '../type';

export default function useFetchTransferProposals(bayAddress: string) {
  console.log('fetchTransferProposals');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transferProposals, setTransferProposals] = useState<
    TransferProposalType[]
  >([]);
  const [retries, setRetries] = useState(5);
  const {
    data: { environment },
  } = useAppSelector((state) => state.walletSlice);
  const {
    data: { fetching },
  } = useAppSelector((state) => state.treasureBaySlice);

  useEffect(() => {
    const fetchTransferProposals = async () => {
      try {
        setLoading(true);
        const treasureBayContract = useTreasureBayContract(bayAddress);
        const treasureBayContractMethods: TreasureBay =
          treasureBayContract.methods;
        const transferProposalAddresses = await treasureBayContractMethods
          .getAllTransferProposals()
          .call();

        if (transferProposalAddresses.length === 0) {
          setTransferProposals([]);
          setLoading(false);
        }

        const transferProposals = await Promise.all(
          transferProposalAddresses.map(
            async (proposal): Promise<TransferProposalType> => {
              const transferProposalContract =
                useTransferProposalContract(proposal);
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
                checkApprovalStatus,
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
                transferProposalMethods.checkApprovalStatus().call(),
              ]);

              return {
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
                checkApprovalStatus,
              };
            }
          )
        );
        setTransferProposals(transferProposals);
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

    fetchTransferProposals();
  }, [fetching, retries, environment]);

  return { transferProposals, loading, error };
}
