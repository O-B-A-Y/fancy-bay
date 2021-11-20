import Head from 'next/head';
import React, { ReactElement } from 'react';
import { DefaultLayout, ExchangeLayout } from '../../../layouts';
import { NextPageWithLayout } from '../../_app';

const Liquidity: NextPageWithLayout = () => {
  console.log('Liquidity Page');
  return (
    <>
      <Head>
        <title>Liquidity | OBAY Exchange</title>
        <meta
          key="description"
          name="description"
          content="Liquidity OBAY Exchange"
        />
      </Head>
      <p>Liquidity Provider Utility</p>
    </>
  );
};

Liquidity.getLayout = function getLayout(page: ReactElement) {
  const myBayNames = [
    'Hội Những Người Giàu Vì Coin Rác',
    'Venture of the future',
  ];
  return (
    <DefaultLayout>
      <ExchangeLayout myBayNames={myBayNames}>{page}</ExchangeLayout>
    </DefaultLayout>
  );
};

export default Liquidity;
