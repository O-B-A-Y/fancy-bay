import { Token } from 'src/constants/token';
import { Erc20 } from 'src/constants/abis/erc20';
import useTokenContract from './useTokenContract';
import React from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import Web3Utils from 'src/utils/web3';

export default function useTokenInfo(tokenAddress: string): Token | undefined {
  const [tokenInfo, setTokenInfo] = React.useState<Token>();
  const { account } = useActiveWeb3React();
  const TokenContract: Erc20 = useTokenContract(tokenAddress, false) as any;
  React.useEffect(() => {
    const fetchBalance = async () => {
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
    };
    fetchBalance();
  }, [account, TokenContract]);

  return tokenInfo;
}
