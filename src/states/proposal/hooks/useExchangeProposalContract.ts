import TransferProposal from '../../../contracts/TransferProposal.json';
import useWeb3Contract from 'src/hooks/useWeb3Contract';

export default function useExchangeProposalContract(
  treasureBayAddress: string
) {
  return useWeb3Contract(treasureBayAddress, TransferProposal.abi);
}
