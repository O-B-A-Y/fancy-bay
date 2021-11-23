import React from 'react';
import ReactModal from 'react-modal';
import { useAppDispatch, useAppSelector } from '../../states/hooks';
import { toggleSelectTokenPairModal } from '../../states/modal/slice';

interface SelectCurrencyPairModalProps {}

const SelectCurrencyPair: React.FC<SelectCurrencyPairModalProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { data: modalData } = useAppSelector((state) => state.modalSlice);
  const handler = {
    CloseModal: () => {
      dispatch(toggleSelectTokenPairModal(false));
    },
  };
  return (
    <ReactModal
      isOpen={modalData.selectTokenPair}
      onRequestClose={handler.CloseModal}
    >
      <div>Hello world {children}</div>
    </ReactModal>
  );
};

export default SelectCurrencyPair;
