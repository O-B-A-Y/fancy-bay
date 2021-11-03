import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import Container from '../components/Container';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
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
      {/* Welcome section */}
      <h1 className={styles.tealHeader}>
        Welcome to{' '}
        <Link href="/">
          <a>OBAY</a>
        </Link>
      </h1>
      {/* Grid test */}
      <Grid
        cols={{
          xs: 1,
          md: 2,
          lg: 3,
        }}
        rows={{
          xs: 1,
          md: 2,
          lg: 2,
        }}
        rowGap="md"
        colGap="md"
      >
        <GridItem
          rowSpan={1}
          style={{
            backgroundColor: '#5bbbc8',
            padding: 16,
            textAlign: 'center',
          }}
        >
          #1
        </GridItem>
        <GridItem
          style={{
            backgroundColor: '#5bbbc8',
            padding: 16,
            textAlign: 'center',
          }}
        >
          #2
        </GridItem>
        <GridItem
          rowSpan={1}
          style={{
            backgroundColor: '#5bbbc8',
            padding: 16,
            textAlign: 'center',
          }}
        >
          #3
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={2}
          style={{
            backgroundColor: '#5bbbc8',
            padding: 16,
            textAlign: 'center',
          }}
        >
          #4
        </GridItem>
      </Grid>
    </Container>
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
