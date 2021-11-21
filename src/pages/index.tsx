import Head from 'next/head';
import Image from 'next/image';
import { ReactElement } from 'react';
import ObayBanner from '../../public/images/obay-banner.gif';
import TreasureChest from '../../public/images/treasure-chest.png';
import { DefaultLayout } from '../layouts';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>OBAY</title>
      <meta key="description" name="description" content="OBAY" />
    </Head>
    <div
      style={{
        width: '100%',
        height: '92.2vh',
        position: 'relative',
      }}
    >
      <Image
        src={ObayBanner}
        alt="OBAY Banner"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
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
    </div>
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
