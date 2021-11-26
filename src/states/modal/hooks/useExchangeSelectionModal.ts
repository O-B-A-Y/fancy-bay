import { NativeCurrencyDetails, TokenDetails } from '../../../types/Token';
import { selectFirstItem, selectSecondItem } from '../../exchange/slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleTokenPairSelectionModal } from '../slice';

const useExchangeSelectionModal = () => {
  const { tokenPairSelection } = useAppSelector(
    (state) => state.modalSlice.data
  );
  const { firstItem, secondItem } = useAppSelector(
    (state) => state.exchangeSlice.data.pair
  );
  const dispatch = useAppDispatch();
  const openExchangeSelectModal = () => {
    dispatch(toggleTokenPairSelectionModal(true));
  };
  const closeExchangeSelectModal = () => {
    dispatch(toggleTokenPairSelectionModal(false));
  };
  const selectFirst = (
    currency: TokenDetails | NativeCurrencyDetails | null
  ) => {
    dispatch(selectFirstItem(currency));
  };

  const selectSecond = (
    currency: TokenDetails | NativeCurrencyDetails | null
  ) => {
    dispatch(selectSecondItem(currency));
  };

  return {
    tokenPairSelection,
    firstItem,
    secondItem,
    selectFirst,
    selectSecond,
    openExchangeSelectModal,
    closeExchangeSelectModal,
  };
};

export default useExchangeSelectionModal;
