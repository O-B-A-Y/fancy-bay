import { Token, TokenAllowed, TokenMapAddress } from 'src/constants/token';
import { ERC20 } from 'src/types/ERC20';
import React from 'react';
import Web3Utils from 'src/utils/web3';
import { useAppSelector } from 'src/states/hooks';
import useTokenContract from './useTokenContract';
import useWeb3Environment from './useWeb3Environment';

export default function useTokenInfo(
  tokenName: TokenAllowed,
  callback?: (success: boolean, error: any) => void
): Token | undefined {
  const environment = useWeb3Environment();
  const { data } = useAppSelector((state) => state.walletSlice);
  const tokenAddress = TokenMapAddress[environment]?.[tokenName];
  const [tokenInfo, setTokenInfo] = React.useState<Token>();
  const { account, chainId } = data.environment;
  const TokenContract = useTokenContract(tokenAddress);
  React.useEffect(() => {
    const fetchBalance = async (): Promise<any> => {
      try {
        if (TokenContract) {
          const tokenMethods: ERC20 = TokenContract.methods;
          const [balance, name, decimals, symbol] = await Promise.all<any>([
            tokenMethods.balanceOf(account as string).call(),
            tokenMethods.name().call(),
            tokenMethods.decimals().call(),
            tokenMethods.symbol().call(),
          ]);
          if (balance && name && decimals) {
            setTokenInfo({
              address: tokenAddress as any,
              balance: Web3Utils.convertFromWei(balance?.toString()),
              decimals,
              name,
              symbol,
            });
          }
        } else {
          return callback?.(false, '');
        }
        return callback?.(true, null);
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(error.message);
        return callback?.(false, error);
      }
    };
    fetchBalance();
  }, [account, chainId, tokenAddress]);

  return tokenInfo;
}
