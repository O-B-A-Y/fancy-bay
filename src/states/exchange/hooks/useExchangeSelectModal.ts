import { NativeCurrencyDetails, TokenDetails } from '../../../types/Token';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSelectTokenPairModal } from '../../modal/slice';
import { selectFirstPair, selectSecondPair } from '../slice';

const useExchangeSelectModal = () => {
  const { selectTokenPair } = useAppSelector((state) => state.modalSlice.data);
  const dispatch = useAppDispatch();
  const openExchangeSelectModal = () => {
    dispatch(toggleSelectTokenPairModal(true));
  };
  const closeExchangeSelectModal = () => {
    dispatch(toggleSelectTokenPairModal(false));
  };
  const selectFirst = (currency: TokenDetails | NativeCurrencyDetails) => {
    dispatch(selectFirstPair(currency));
  };

  const selectSecond = (currency: TokenDetails | NativeCurrencyDetails) => {
    dispatch(selectSecondPair(currency));
  };

  return {
    selectTokenPair,
    selectFirst,
    selectSecond,
    openExchangeSelectModal,
    closeExchangeSelectModal,
  };
};

export default useExchangeSelectModal;
