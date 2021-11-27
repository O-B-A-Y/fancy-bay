import clsx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { MdCancel } from 'react-icons/md';
import ReactModal from 'react-modal';
import { Button, Flex, FlexItem, TextInput } from '../../components';
import TextInputVariant from '../../constants/textInputVariant';
import useFormValidation from '../../hooks/useFormValidation';
import useExchangeSelectionModal from '../../states/modal/hooks/useExchangeSelectionModal';
import colors from '../../styles/colors.module.scss';
import { NativeCurrencyDetails, TokenDetails } from '../../types/Token';
import URLUtils from '../../utils/url';
import Web3Utils from '../../utils/web3';
import styles from './ExchangeSelectionModal.module.scss';

interface ExchangeSelectionModalProps {
  items: (TokenDetails | NativeCurrencyDetails)[];
  currentSelectOrder: number;
  className?: string;
  style?: ReactModal.Styles;
}

ReactModal.setAppElement('#__next');

const ExchangeSelectionModal: React.FC<ExchangeSelectionModalProps> = ({
  items,
  currentSelectOrder,
  className,
  style,
}) => {
  const {
    tokenPairSelection,
    firstItem,
    secondItem,
    closeExchangeSelectModal,
    selectFirst,
    selectSecond,
  } = useExchangeSelectionModal();
  const { formValues, handleSetFieldValue } = useFormValidation({
    searchInput: '',
  });

  // Filter search input
  const filteredItems = useMemo(
    () =>
      items.filter((t) => {
        // Handle native currency without address
        if (!('address' in t)) {
          return (
            (t as NativeCurrencyDetails).name
              .toLowerCase()
              .includes(formValues.searchInput.toLowerCase()) ||
            (t as NativeCurrencyDetails).symbol
              .toLowerCase()
              .includes(formValues.searchInput.toLowerCase())
          );
        }
        // Check if input is valid contract address
        if (Web3Utils.isEthereumAddress(formValues.searchInput)) {
          return (
            (t as TokenDetails).address.toLowerCase() ===
            formValues.searchInput.toLowerCase()
          );
        }
        return (
          (t as TokenDetails).name
            .toLowerCase()
            .includes(formValues.searchInput.toLowerCase()) ||
          (t as TokenDetails).symbol
            .toLowerCase()
            .includes(formValues.searchInput.toLowerCase())
        );
      }),
    [items, formValues.searchInput]
  );

  /**
   * Check if items/tokens are selected in the modal
   * @param item Item to be checked
   * @returns True if selected || False if not
   */
  const isItemSelected = (item: TokenDetails | NativeCurrencyDetails) =>
    item.symbol === firstItem?.symbol || item.symbol === secondItem?.symbol;

  /* * Handler functions * */
  const handler = {
    SelectByOrder(item: TokenDetails | NativeCurrencyDetails) {
      if (currentSelectOrder === 0) {
        return selectFirst(item);
      }
      return selectSecond(item);
    },
  };

  return (
    <ReactModal
      isOpen={tokenPairSelection}
      onRequestClose={closeExchangeSelectModal}
      closeTimeoutMS={250}
      contentLabel="ExchangeSelectModal"
      className={className}
      style={style}
    >
      <Flex className={styles.modal} direction="column" rowGap="md">
        {/* Header */}
        <Flex direction="row">
          <FlexItem flex="one">Select a Token</FlexItem>
          <FlexItem onClick={closeExchangeSelectModal}>
            <MdCancel className={styles.closeModalIcon} />
          </FlexItem>
        </Flex>
        {/* Body */}
        <FlexItem>
          <TextInput
            variant={TextInputVariant.outlined}
            borderWidth={1}
            backgroundColor={colors.dark500}
            placeholder="Name, symbol or contract address"
            inputClassName={styles.tokenInput}
            onValueChanged={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetFieldValue('searchInput', e.target.value)
            }
          />
        </FlexItem>
        <FlexItem className={styles.tokenList}>
          {/* List of Tokens/Ether */}
          <Flex direction="column" rowGap="sm">
            {/* Token item */}
            {filteredItems.map((token) => (
              <Flex
                key={token.symbol}
                direction="row"
                colGap="sm"
                className={clsx({
                  [styles.tokenContainer]: true,
                  [styles.selectedTokenContainer]: isItemSelected(token),
                })}
                onClick={() => {
                  handler.SelectByOrder(token);
                  closeExchangeSelectModal();
                }}
              >
                <FlexItem>
                  <Image
                    src={URLUtils.processValidURL(token.logoURI)}
                    width={38}
                    height={38}
                    className={clsx({
                      [styles.symbolImg]: true,
                      [styles.selectedSymbolImg]: isItemSelected(token),
                    })}
                  />
                </FlexItem>
                <FlexItem>
                  <Flex direction="column">
                    <FlexItem
                      className={clsx({
                        [styles.selectedAnnotation]: isItemSelected(token),
                      })}
                    >
                      {token.symbol}
                    </FlexItem>
                    <FlexItem
                      className={clsx({
                        [styles.annotationName]: true,
                        [styles.selectedAnnotation]: isItemSelected(token),
                      })}
                    >
                      {token.name}
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Flex>
            ))}
          </Flex>
        </FlexItem>
        <FlexItem>
          <Button className={styles.manageBtn}>Manage Tokens</Button>
        </FlexItem>
      </Flex>
    </ReactModal>
  );
};

export default ExchangeSelectionModal;
