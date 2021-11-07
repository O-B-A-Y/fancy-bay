import { AddressZero } from '@ethersproject/constants';
import { Web3Provider } from '@ethersproject/providers';
import { getProviderOrSigner } from '@sushiswap/core-sdk';
import { Contract } from 'ethers';
import { isAddress } from 'src/utils/validate';

class ContractFunc {
  // account is optional
  public static getContract(
    address: string,
    ABI: any,
    library: Web3Provider,
    account?: string
  ): Contract {
    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`);
    }

    return new Contract(
      address,
      ABI,
      getProviderOrSigner(library, account) as any
    );
  }
}

export default ContractFunc;
