import Proposal from '../../../contracts/Proposal.json';
import useWeb3Contract from 'src/hooks/useWeb3Contract';

export default function useProposalContract(proposalAddress: string) {
  return useWeb3Contract(proposalAddress, Proposal.abi);
}
