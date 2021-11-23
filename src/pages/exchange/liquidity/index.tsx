import { buildUrl } from 'cloudinary-build-url';
import Head from 'next/head';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { Button, Flex, FlexItem, NumberInput } from '../../../components';
import { DefaultLayout, ExchangeLayout } from '../../../layouts';
import { NextPageWithLayout } from '../../_app';
import styles from './Liquidity.module.scss';

const Liquidity: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Liquidity | OBAY Exchange</title>
      <meta
        key="description"
        name="description"
        content="Liquidity OBAY Exchange"
      />
    </Head>

    {/* --Liquidity section-- */}
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
            alignContent="center"
            justifyContent="center"
            className={styles.annotationContainer}
          >
            <FlexItem className={styles.guideAnnotation}>Input:</FlexItem>
            <FlexItem className={styles.currencyAnnotation}>ETH</FlexItem>
          </Flex>
        </Flex>
      </FlexItem>
      {/* Right Side - Input */}
      <FlexItem className={styles.rightItem} flex="one">
        <NumberInput className={styles.valueInput} />
      </FlexItem>
    </Flex>
    <MdAddCircle className={styles.addIcon} />
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
            alignContent="center"
            justifyContent="center"
            className={styles.annotationContainer}
          >
            <FlexItem className={styles.guideAnnotation}>Input:</FlexItem>
            <FlexItem className={styles.currencyAnnotation}>USDT</FlexItem>
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

Liquidity.getLayout = function getLayout(page: ReactElement) {
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

export default Liquidity;
