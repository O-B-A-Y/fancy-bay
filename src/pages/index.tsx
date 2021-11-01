import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import Container from '../components/Container';
import { DefaultLayout } from '../layouts';
import styles from './index.module.scss';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>OBAY</title>
      <meta key="description" name="description" content="OBAY" />
    </Head>
    <Container>
      <h1 className={styles.tealHeader}>
        Welcome to{' '}
        <Link href="/">
          <a>OBAY</a>
        </Link>
      </h1>
    </Container>
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
