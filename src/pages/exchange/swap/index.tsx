/* eslint-disable jsx-a11y/click-events-have-key-events */
import Head from 'next/head';
import Image from 'next/image';
import React, { ReactElement, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdSwapVerticalCircle } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Flex, FlexItem, NumberInput } from '../../../components';
import { DefaultLayout, ExchangeLayout } from '../../../layouts';
import ExchangeSelectModal from '../../../modals/ExchangeSelectModal';
import useExchangeSelectModal from '../../../states/exchange/hooks/useExchangeSelectModal';
import { useAppDispatch, useAppSelector } from '../../../states/hooks';
import { importTokenList } from '../../../states/token/slice';
import colors from '../../../styles/colors.module.scss';
import URLUtils from '../../../utils/url';
import { NextPageWithLayout } from '../../_app';
import styles from './Swap.module.scss';

const Exchange: NextPageWithLayout = () => {
  const { openExchangeSelectModal } = useExchangeSelectModal();
  const tokenData = useAppSelector((state) => state.tokenSlice.data.tokens);
  const { firstPair, secondPair } = useAppSelector(
    (state) => state.exchangeSlice.data
  );
  const dispatch = useAppDispatch();

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
        toast.error(`ERROR! Cannot import list of tokens!`, {
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
                src={URLUtils.processValidURL(firstPair!.logoURI)}
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
                {firstPair?.symbol}
                <div
                  className={styles.selectCurrency}
                  onClick={openExchangeSelectModal}
                  role="button"
                  tabIndex={0}
                >
                  <IoIosArrowDown className={styles.selectCurrencyIcon} />
                </div>
                {/* React Modal */}
                <ExchangeSelectModal tokens={tokenData} />
              </FlexItem>
            </Flex>
          </Flex>
        </FlexItem>
        {/* Right Side - Input */}
        <FlexItem className={styles.rightItem} flex="one">
          <NumberInput className={styles.valueInput} />
        </FlexItem>
      </Flex>
      <MdSwapVerticalCircle className={styles.swapIcon} />
      {/* Token GET-OUT */}
      <Flex className={styles.inputSection}>
        {/* Left Side */}
        <FlexItem alignSelf="center" flex="one">
          <Flex>
            {/* Logo */}
            <FlexItem className={styles.symbolIcon} alignSelf="center">
              <Image
                src={URLUtils.processValidURL(
                  secondPair?.logoURI ??
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
                {secondPair?.symbol ?? '?'}
                <div
                  className={styles.selectCurrency}
                  onClick={openExchangeSelectModal}
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
  const myBayNames = [
    'Venture of the future',
    'Hội Những Người Giàu Vì Coin Rác',
  ];
  return (
    <DefaultLayout>
      <ExchangeLayout myBayNames={myBayNames}>{page}</ExchangeLayout>
    </DefaultLayout>
  );
};

export default Exchange;
