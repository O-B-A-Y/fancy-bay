import React from 'react';
import { MdCancel } from 'react-icons/md';
import ReactModal from 'react-modal';
import { Flex, FlexItem } from '../../components';
import useMyBaysSelectionModal from '../../states/modal/hooks/useMyBaysSelectionModal';
import { TreasureBayType } from '../../states/treasureBay/types';
import styles from './MyBaysSelectionModal.module.scss';

interface MyBaysSelectionModalProps {
  myBays: TreasureBayType[];
  className?: string;
  style?: ReactModal.Styles;
}

const MyBaysSelectionModal: React.FC<MyBaysSelectionModalProps> = ({
  myBays,
  className,
  style,
}) => {
  const { close, myBaysSelectionModal } = useMyBaysSelectionModal();
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
        <Flex direction="column" rowGap="md">
          {/* Header */}
          <Flex direction="row">
            <FlexItem flex="one">Select MyBay</FlexItem>
            <FlexItem onClick={close}>
              <MdCancel className={styles.closeModalIcon} />
            </FlexItem>
          </Flex>
          {/* Body */}
          <FlexItem>
            {myBays.map((b) => (
              <div key={b.address}>{b.name}</div>
            ))}
          </FlexItem>
        </Flex>
      </ReactModal>
    </>
  );
};

export default React.memo(MyBaysSelectionModal);
