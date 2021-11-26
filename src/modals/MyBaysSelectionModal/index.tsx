import React from 'react';
import ReactModal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import colors from '../../../styles/colors.module.scss';
import useEffectOnce from '../../hooks/useEffectOnce';
import useMyBaysSelectionModal from '../../states/modal/hooks/useMyBaysSelectionModal';
import useFetchYourTreasureBays from '../../states/treasureBay/hooks/useFetchYourTreasureBays';

interface MyBaysSelectionModalProps {
  className?: string;
  style?: ReactModal.Styles;
}

const MyBaysSelectionModal: React.FC<MyBaysSelectionModalProps> = ({
  className,
  style,
}) => {
  const { close, myBaysSelectionModal } = useMyBaysSelectionModal();

  const { bays, loading, error } = useFetchYourTreasureBays();
  if (error) {
    // eslint-disable-next-line no-console
    toast.error(`ERROR! Cannot import default list of tokens! ${error}`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  useEffectOnce(() => {
    console.log('MyBaysSelection Modal Rendered!');
  });
  return (
    <>
      <ReactModal
        isOpen={myBaysSelectionModal}
        onRequestClose={close}
        closeTimeoutMS={250}
        contentLabel="ExchangeSelectModal"
        className={className}
        style={style}
      >
        <b>MyBays Selection Modal</b>
        <div>
          {bays.map((b) => (
            <div>
              {b.name} - {b.address} - {b.creator}
            </div>
          ))}
        </div>
      </ReactModal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: colors.dark800,
        }}
      />
    </>
  );
};

export default MyBaysSelectionModal;
