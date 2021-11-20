/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement } from 'react';
import Image from 'next/image';
import { BayLayout, DefaultLayout } from 'src/layouts';
import { LeftSidedContainerTab } from 'src/layouts/Bay';
import { NextPageWithLayout } from 'src/pages/_app';
import styles from './Portfolio.module.scss';
import PortfolioImage from '../../../../../public/images/portfolio.png';

const BayPortfolio: NextPageWithLayout = () => (
  <div className={styles.container} style={{ marginTop: '55px' }}>
    <Image src={PortfolioImage} layout="responsive" />
  </div>
);

BayPortfolio.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { address } = router.query;
  return (
    <DefaultLayout>
      <BayLayout
        selectedTab={LeftSidedContainerTab.Portfolio}
        address={address as string}
      >
        {page}
      </BayLayout>
    </DefaultLayout>
  );
};

export default BayPortfolio;
