/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChainId } from '@sushiswap/sdk';
import Head from 'next/head';
import Image from 'next/image';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdSwapVerticalCircle } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Flex, FlexItem, NumberInput } from '../../../components';
import { DefaultLayout, ExchangeLayout } from '../../../layouts';
import ExchangeSelectionModal from '../../../modals/ExchangeSelectionModal';
import {
  importTokenList,
  selectFirstItem,
  selectSecondItem,
  switchChainCurrency,
} from '../../../states/exchange/slice';
import { useAppDispatch, useAppSelector } from '../../../states/hooks';
import useExchangeSelectionModal from '../../../states/modal/hooks/useExchangeSelectionModal';
import colors from '../../../styles/colors.module.scss';
import URLUtils from '../../../utils/url';
import { NextPageWithLayout } from '../../_app';
import styles from './Swap.module.scss';

const Exchange: NextPageWithLayout = () => {
  const [selectOrder, setSelectOrder] = useState<number>(0);
  const { openExchangeSelectModal } = useExchangeSelectionModal();
  const { nativeCurrency, token: tokenData } = useAppSelector(
    (state) => state.exchangeSlice.data
  );
  const { firstItem, secondItem } = useAppSelector(
    (state) => state.exchangeSlice.data.pair
  );
  const { chainId } = useAppSelector(
    (state) => state.walletSlice.data.environment
  );
  const dispatch = useAppDispatch();

  // Filter tokens by chainId
  const chainTokens = useMemo(() => {
    if (chainId && tokenData.list.length > 0)
      return tokenData.list.filter((t) => t.chainId === 1);
    return [];
  }, [chainId, tokenData]);

  const swapSelectedItems = () => {
    if (typeof firstItem !== 'undefined' && typeof secondItem !== 'undefined') {
      const temp = firstItem;
      dispatch(selectFirstItem(secondItem));
      dispatch(selectSecondItem(temp));
      return;
    }
    throw new Error('ERROR! Undefined items in selection');
  };

  // Init native currency for specific chainId
  useEffect(() => {
    if (chainId) dispatch(switchChainCurrency(chainId as ChainId));
  }, [chainId]);

  // Fetch initial default token list of OBAY Exchange
  useEffect(() => {
    // Initial token list (Stablecoin)
    (async () => {
      try {
        await dispatch(
          importTokenList(
            'ipfs://QmZbWsMTSGqPny7jSzbMX43RaAvUupKHsHiRAZU9hJ75WB' // Remove 'B' to cause error
          )
        ).unwrap();
      } catch (err) {
        toast.error(`ERROR! Cannot import default list of tokens!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Swap | OBAY Exchange</title>
        <meta
          key="description"
          name="description"
          content="Swap OBAY Exchange"
        />
      </Head>
      {/* --Swap section-- */}
      {/* Token PUT-IN */}
      <Flex className={styles.inputSection}>
        {/* Left Side - Symbol/Currency */}
        <FlexItem alignSelf="center" flex="one">
          <Flex>
            {/* Logo */}
            <FlexItem className={styles.symbolIcon} alignSelf="center">
              <Image
                src={URLUtils.processValidURL(
                  firstItem?.logoURI ??
                    'ipfs://Qmdhd65V2sC7LXoVypL53qNgUmQDG6hpFBKPyevssrSkqQ'
                )}
                width={52}
                height={52}
                className={styles.symbolImg}
              />
            </FlexItem>
            {/* Annotation - FROM */}
            <Flex
              direction="column"
              justifyContent="center"
              className={styles.annotationContainer}
            >
              <FlexItem className={styles.guideAnnotation}>From:</FlexItem>
              <FlexItem className={styles.currencyAnnotation}>
                {firstItem?.symbol ?? '?'}
                <div
                  className={styles.selectCurrency}
                  onClick={() => {
                    setSelectOrder(0);
                    openExchangeSelectModal();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <IoIosArrowDown className={styles.selectCurrencyIcon} />
                </div>
              </FlexItem>
            </Flex>
          </Flex>
        </FlexItem>
        {/* Right Side - Input */}
        <FlexItem className={styles.rightItem} flex="one">
          <NumberInput className={styles.valueInput} />
        </FlexItem>
      </Flex>
      <MdSwapVerticalCircle
        className={styles.swapIcon}
        onClick={swapSelectedItems}
      />
      {/* Token GET-OUT */}
      <Flex className={styles.inputSection}>
        {/* Left Side */}
        <FlexItem alignSelf="center" flex="one">
          <Flex>
            {/* Logo */}
            <FlexItem className={styles.symbolIcon} alignSelf="center">
              <Image
                src={URLUtils.processValidURL(
                  secondItem?.logoURI ??
                    'ipfs://Qmdhd65V2sC7LXoVypL53qNgUmQDG6hpFBKPyevssrSkqQ'
                )}
                width={52}
                height={52}
                className={styles.symbolImg}
              />
            </FlexItem>
            {/* Annotation - TO */}
            <Flex
              direction="column"
              justifyContent="center"
              alignContent="center"
              className={styles.annotationContainer}
            >
              <FlexItem className={styles.guideAnnotation}>To:</FlexItem>
              <FlexItem className={styles.currencyAnnotation}>
                {secondItem?.symbol ?? '?'}
                <div
                  className={styles.selectCurrency}
                  onClick={() => {
                    setSelectOrder(1);
                    openExchangeSelectModal();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <IoIosArrowDown className={styles.selectCurrencyIcon} />
                </div>
              </FlexItem>
            </Flex>
          </Flex>
        </FlexItem>
        {/* Right Side - Input */}
        <FlexItem className={styles.rightItem} flex="one">
          <NumberInput className={styles.valueInput} />
        </FlexItem>
      </Flex>
      <Button className={styles.submitBtn}>Submit</Button>
      {/* ExchangeSelectionModal */}
      <ExchangeSelectionModal
        items={nativeCurrency ? [nativeCurrency, ...chainTokens] : chainTokens}
        currentSelectOrder={selectOrder}
      />

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

Exchange.getLayout = function getLayout(page: ReactElement) {
  return (
    <DefaultLayout>
      <ExchangeLayout>{page}</ExchangeLayout>
    </DefaultLayout>
  );
};

export default Exchange;
