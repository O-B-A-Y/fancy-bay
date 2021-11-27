import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { IoIosCopy } from 'react-icons/io';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';
import ReactModal from 'react-modal';
import { Flex, FlexItem, TextInput } from '../../components';
import TextInputVariant from '../../constants/textInputVariant';
import useFormValidation from '../../hooks/useFormValidation';
import useMyBaysSelectionModal from '../../states/modal/hooks/useMyBaysSelectionModal';
import { TreasureBayType } from '../../states/treasureBay/types';
import colors from '../../styles/colors.module.scss';
import Web3Utils from '../../utils/web3';
import styles from './MyBaysSelectionModal.module.scss';

type MyBayCopyAddress = { [key: string]: boolean };
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
  const { close, myBaysSelectionModal, select } = useMyBaysSelectionModal();
  const [isCopied, setIsCopied] = useState<MyBayCopyAddress>({});
  const { formValues, handleSetFieldValue } = useFormValidation({
    searchInput: '',
  });
  // Filter search input
  const filteredItems = useMemo(
    () =>
      myBays.filter((b) => {
        // Check if input is valid contract address
        if (Web3Utils.isEthereumAddress(formValues.searchInput)) {
          return (
            b.address.toLowerCase() === formValues.searchInput.toLowerCase()
          );
        }
        return b.name
          .toLowerCase()
          .includes(formValues.searchInput.toLowerCase());
      }),
    [myBays, formValues.searchInput]
  );

  return (
    <>
      <ReactModal
        isOpen={myBaysSelectionModal}
        onRequestClose={() => {
          close();
          setTimeout(() => {
            setIsCopied(
              myBays.reduce((obj, b) => ({ ...obj, [b.address]: false }), {})
            );
          }, 500);
        }}
        closeTimeoutMS={250}
        contentLabel="ExchangeSelectModal"
        className={className}
        style={style}
      >
        <Flex className={styles.modal} direction="column" rowGap="md">
          {/* Header */}
          <Flex direction="row">
            <FlexItem flex="one">Select MyBay</FlexItem>
            <FlexItem
              onClick={() => {
                close();
                setTimeout(() => {
                  setIsCopied(
                    myBays.reduce(
                      (obj, b) => ({ ...obj, [b.address]: false }),
                      {}
                    )
                  );
                }, 500);
              }}
            >
              <MdCancel className={styles.closeModalIcon} />
            </FlexItem>
          </Flex>
          {/* Body */}
          <FlexItem>
            <TextInput
              variant={TextInputVariant.outlined}
              borderWidth={1}
              backgroundColor={colors.dark500}
              placeholder="Name or contract address"
              inputClassName={styles.myBaysInput}
              onValueChanged={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSetFieldValue('searchInput', e.target.value)
              }
            />
          </FlexItem>
          <FlexItem className={styles.myBaysList}>
            {/* List of MyBays */}
            <Flex direction="column" rowGap="sm">
              {filteredItems.map((b) => (
                <Flex
                  key={b.address}
                  direction="row"
                  colGap="sm"
                  alignItems="center"
                  className={clsx({
                    [styles.myBaysContainer]: true,
                  })}
                  onClick={() => {
                    close();
                    select(b);
                  }}
                >
                  <FlexItem flex="one">{b.name} </FlexItem>
                  <FlexItem>
                    {!isCopied[b.address] || !isCopied[b.address] ? (
                      <IoIosCopy
                        size={18}
                        className={styles.copyIcon}
                        onClick={() => {
                          navigator.clipboard.writeText(b.address);
                          setIsCopied({
                            [b.address]: true,
                          });
                        }}
                      />
                    ) : (
                      <IoCheckmarkDone
                        size={18}
                        className={styles.checkmarkIcon}
                      />
                    )}
                  </FlexItem>
                </Flex>
              ))}
            </Flex>
          </FlexItem>
        </Flex>
      </ReactModal>
    </>
  );
};

export default React.memo(MyBaysSelectionModal);
