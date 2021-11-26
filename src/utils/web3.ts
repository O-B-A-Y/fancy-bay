import BN from 'bn.js';
import web3 from 'web3';

export default class Web3Utils {
  public static convertFromWei(value: BN | string) {
    return web3.utils.fromWei(value);
  }

  public static isEthereumAddress(input: string) {
    return web3.utils.isAddress(input);
  }
}
