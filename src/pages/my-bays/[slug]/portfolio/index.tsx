/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement } from 'react';
import { BayLayout, DefaultLayout } from 'src/layouts';
import { LeftSidedContainerTab } from 'src/layouts/Bay';
import { NextPageWithLayout } from 'src/pages/_app';
import styles from './Portfolio.module.scss';

const BayPortfolio: NextPageWithLayout = () => (
  <div className={styles.container}>Portfolio</div>
);

BayPortfolio.getLayout = function getLayout(page: ReactElement) {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <DefaultLayout>
      <BayLayout
        selectedTab={LeftSidedContainerTab.Portfolio}
        slug={slug as string}
      >
        {page}
      </BayLayout>
    </DefaultLayout>
  );
};

export default BayPortfolio;
