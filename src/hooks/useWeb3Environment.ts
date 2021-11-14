import { ENVIRONMENT } from 'src/constants/token';
import { useAppSelector } from 'src/states/hooks';

export default function useWeb3Environment() {
  const { environment } = useAppSelector((state) => state.walletSlice.data);
  return environment.isDevelopment
    ? ENVIRONMENT.DEVELOPMENT
    : ENVIRONMENT.PRODUCTION;
}
