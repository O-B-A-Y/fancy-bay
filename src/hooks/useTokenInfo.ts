import { Token } from 'src/constants/token';
import { Erc20 } from 'src/constants/abis/erc20';
import useTokenContract from './useTokenContract';
import React from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import Web3Utils from 'src/utils/web3';

export default function useTokenInfo(
  tokenAddress: string,
  callback?: (success: boolean, error: any) => void
): Token | undefined {
  const [tokenInfo, setTokenInfo] = React.useState<Token>();
  const { account, chainId } = useActiveWeb3React();
  const TokenContract: Erc20 = useTokenContract(tokenAddress, false) as any;
  React.useEffect(() => {
    const fetchBalance = async (): Promise<any> => {
      try {
        if (TokenContract) {
          const [balance, name, decimals, symbol] = await Promise.all<any>([
            TokenContract.balanceOf(account as string),
            TokenContract.name(),
            TokenContract.decimals(),
            TokenContract.symbol(),
          ]);
          if (balance && name && decimals) {
            setTokenInfo({
              address: tokenAddress,
              balance: Web3Utils.convertFromWei(balance?.toString()),
              decimals,
              name,
              symbol,
            });
          }
        }
        return callback?.(true, null);
      } catch (error) {
        return callback?.(false, error);
      }
    };
    fetchBalance();
  }, [account, TokenContract, chainId, tokenAddress]);

  return tokenInfo;
}
