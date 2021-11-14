import TreasureBayFactory from '../../../contracts/TreasureBayFactory.json';
import useWeb3Contract from 'src/hooks/useWeb3Contract';

export default function useTreasureBayContract(treasureBayAddress: string) {
  return useWeb3Contract(treasureBayAddress, TreasureBayFactory.abi);
}
