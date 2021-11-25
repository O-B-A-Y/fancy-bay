import { NativeCurrencyDetails, TokenDetails } from '../../../types/Token';
import { selectFirstItem, selectSecondItem } from '../../exchange/slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleSelectTokenPairModal } from '../slice';

const useExchangeSelectModal = () => {
  const { selectTokenPair } = useAppSelector((state) => state.modalSlice.data);
  const { firstItem, secondItem } = useAppSelector(
    (state) => state.exchangeSlice.data.pair
  );
  const dispatch = useAppDispatch();
  const openExchangeSelectModal = () => {
    dispatch(toggleSelectTokenPairModal(true));
  };
  const closeExchangeSelectModal = () => {
    dispatch(toggleSelectTokenPairModal(false));
  };
  const selectFirst = (currency: TokenDetails | NativeCurrencyDetails) => {
    dispatch(selectFirstItem(currency));
  };

  const selectSecond = (currency: TokenDetails | NativeCurrencyDetails) => {
    dispatch(selectSecondItem(currency));
  };

  return {
    selectTokenPair,
    firstItem,
    secondItem,
    selectFirst,
    selectSecond,
    openExchangeSelectModal,
    closeExchangeSelectModal,
  };
};

export default useExchangeSelectModal;
