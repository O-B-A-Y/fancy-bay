import { buildUrl } from 'cloudinary-build-url';
import Head from 'next/head';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdSwapVerticalCircle } from 'react-icons/md';
import { Button, Flex, FlexItem, NumberInput } from '../../../components';
import { DefaultLayout, ExchangeLayout } from '../../../layouts';
import { NextPageWithLayout } from '../../_app';
import styles from './Swap.module.scss';

const Exchange: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Swap | OBAY Exchange</title>
      <meta key="description" name="description" content="Swap OBAY Exchange" />
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
              src={buildUrl('eth_logo', {
                transformations: {
                  resize: {
                    width: 52,
                    height: 52,
                  },
                },
              })}
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
              ETH
              <div className={styles.selectCurrency}>
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
    <MdSwapVerticalCircle className={styles.swapIcon} />
    {/* Token GET-OUT */}
    <Flex className={styles.inputSection}>
      {/* Left Side */}
      <FlexItem alignSelf="center" flex="one">
        <Flex>
          {/* Logo */}
          <FlexItem className={styles.symbolIcon} alignSelf="center">
            <Image
              src={buildUrl('usdt_logo', {
                transformations: {
                  resize: {
                    width: 52,
                    height: 52,
                  },
                },
              })}
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
              USDT
              <div className={styles.selectCurrency}>
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
  </>
);

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
