import { selectMyBay } from '../../exchange/slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { TreasureBayType } from '../../treasureBay/types';
import { toggleMyBaysSelectionModal } from '../slice';

const useMyBaysSelectionModal = () => {
  // Modal state
  const { myBaysSelectionModal } = useAppSelector(
    (state) => state.modalSlice.data
  );
  const dispatch = useAppDispatch();
  const close = () => {
    dispatch(toggleMyBaysSelectionModal(false));
  };
  const open = () => {
    dispatch(toggleMyBaysSelectionModal(true));
  };
  const select = (myBay: TreasureBayType) => {
    dispatch(selectMyBay(myBay));
  };

  return {
    myBaysSelectionModal,
    close,
    open,
    select,
  };
};

export default useMyBaysSelectionModal;
