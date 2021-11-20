import Head from 'next/head';
import Image from 'next/image';
import { ReactElement } from 'react';
import { DefaultLayout } from '../layouts';
import styles from './index.module.scss';
import { NextPageWithLayout } from './_app';
import ObayBanner from '../../public/images/obay-banner.gif';
import TreasureChest from '../../public/images/treasure-chest.png';
import colors from '../styles/colors.module.scss';
import { Button } from 'src/components';
import ButtonVariant from 'src/constants/buttonVariant';
import ButtonSize from 'src/constants/buttonConstant';
import TextAlign from 'src/constants/textAlign';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>OBAY</title>
      <meta key="description" name="description" content="OBAY" />
    </Head>
    <main
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Image src={ObayBanner} layout="fill" />
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgb(0, 0, 0, 0.5)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Image src={TreasureChest} height={200} width={300} />
          <div style={{ marginLeft: '-20px' }}>
            <h3 style={{ color: 'white', fontSize: 30, margin: 0 }}>
              Where your treasures lies
            </h3>
            <h1 style={{ color: 'white', fontSize: '13vw', margin: 0 }}>
              OBAY
            </h1>
          </div>
        </div>
      </div>
    </main>
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
