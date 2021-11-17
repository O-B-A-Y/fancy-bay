import TransferProposal from '../../../contracts/TransferProposal.json';
import useWeb3Contract from 'src/hooks/useWeb3Contract';

export default function useTransferProposalContract(
  transferProposalAddress: string
) {
  return useWeb3Contract(transferProposalAddress, TransferProposal.abi);
}
