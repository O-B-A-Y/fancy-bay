import React, { ReactElement } from 'react';
import { Container } from '../../components';
import { DefaultLayout } from '../../layouts';
import { NextPageWithLayout } from '../_app';
import styles from './Exchange.module.scss';

const Exchange: NextPageWithLayout = () => (
  <Container className={styles.container}>
    <div className={styles.innerContainer}>
      {/* Select BAY Modal */}
      <div>Hi</div>
    </div>
  </Container>
);

Exchange.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Exchange;
