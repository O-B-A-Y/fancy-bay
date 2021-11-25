import Image from 'next/image';
import React, { useMemo } from 'react';
import { MdCancel } from 'react-icons/md';
import ReactModal from 'react-modal';
import { Button, Flex, FlexItem, TextInput } from '../../components';
import TextInputVariant from '../../constants/textInputVariant';
import useFormValidation from '../../hooks/useFormValidation';
import useExchangeSelectModal from '../../states/exchange/hooks/useExchangeSelectModal';
import colors from '../../styles/colors.module.scss';
import { NativeCurrencyDetails, TokenDetails } from '../../types/Token';
import URLUtils from '../../utils/url';
import Web3Utils from '../../utils/web3';
import styles from './ExchangeSelectModal.module.scss';

interface ExchangeSelectModalProps {
  tokens: (TokenDetails | NativeCurrencyDetails)[];
  className?: string;
  style?: ReactModal.Styles;
}

ReactModal.setAppElement('#__next');

const ExchangeSelectModal: React.FC<ExchangeSelectModalProps> = ({
  tokens,
  className,
  style,
}) => {
  const { selectTokenPair, closeExchangeSelectModal } =
    useExchangeSelectModal();
  const { formValues, handleSetFieldValue } = useFormValidation({
    searchInput: '',
  });

  // Filter search input
  const filteredTokens = useMemo(
    () =>
      tokens.filter((t) => {
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
    [tokens, formValues.searchInput]
  );
  return (
    <ReactModal
      isOpen={selectTokenPair}
      onRequestClose={closeExchangeSelectModal}
      closeTimeoutMS={250}
      contentLabel="ExchangeSelectModal"
      className={className}
      style={style}
    >
      <Flex direction="column" rowGap="md">
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
            placeholder="Name or contract address"
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
            {filteredTokens.map((token, index) => (
              <Flex key={index.toString()} direction="row" colGap="sm">
                <FlexItem>
                  <Image
                    src={URLUtils.processValidURL(token.logoURI)}
                    width={38}
                    height={38}
                    className={styles.symbolImg}
                  />
                </FlexItem>
                <FlexItem>
                  <Flex direction="column">
                    <FlexItem>{token.symbol}</FlexItem>
                    <FlexItem className={styles.annotationName}>
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

export default ExchangeSelectModal;
