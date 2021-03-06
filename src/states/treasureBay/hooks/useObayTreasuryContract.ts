import ObayTreasury from '../../../contracts/ObayTreasury.json';
import useWeb3Contract from 'src/hooks/useWeb3Contract';
import { ContractMapAddress } from 'src/constants/contract';
import useWeb3Environment from 'src/hooks/useWeb3Environment';

export default function useObayTreasuryContract() {
  const environment = useWeb3Environment();
  return useWeb3Contract(
    ContractMapAddress[environment].OBAY_TREASURY,
    ObayTreasury.abi
  );
}
