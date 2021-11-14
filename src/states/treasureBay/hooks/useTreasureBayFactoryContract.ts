import TreasureBayFactory from '../../../contracts/TreasureBayFactory.json';
import useWeb3Contract from 'src/hooks/useWeb3Contract';
import { ContractMapAddress } from 'src/constants/contract';
import useWeb3Environment from 'src/hooks/useWeb3Environment';

export default function useTreasureBayFactoryContract() {
  const environment = useWeb3Environment();
  return useWeb3Contract(
    ContractMapAddress[environment].TREASURE_BAY_FACTORY,
    TreasureBayFactory.abi
  );
}
