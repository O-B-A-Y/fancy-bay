import { useAppDispatch, useAppSelector } from '../../hooks';
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

  return {
    myBaysSelectionModal,
    close,
    open,
  };
};

export default useMyBaysSelectionModal;
