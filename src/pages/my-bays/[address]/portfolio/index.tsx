/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/dist/client/router';
import React, { ReactElement } from 'react';
import { BayLayout, DefaultLayout } from 'src/layouts';
import { LeftSidedContainerTab } from 'src/layouts/Bay';
import { NextPageWithLayout } from 'src/pages/_app';
import styles from './Portfolio.module.scss';
import { Line } from '@ant-design/charts';
import useWeb3 from 'src/hooks/useWeb3';
import useFetchTreasureBay from 'src/states/treasureBay/hooks/useFetchTreasureBay';
import useSendWyreAPI from 'src/hooks/useSendWyreAPI';
import { CurrencyUtils } from 'src/utils';
import colors from '../../../../styles/colors.module.scss';
import GridItem from 'src/components/GridItem';
import { Grid } from 'src/components';
import { AdvancedChart } from 'react-tradingview-embed';

const BayPortfolio: NextPageWithLayout = () => {
  const router = useRouter();
  const web3 = useWeb3();
  const { address } = router.query;
  const { bay } = useFetchTreasureBay(address as string);
  const sendWyreResponse = useSendWyreAPI();
  const data = React.useMemo(
    () => [
      {
        name: 'ETH',
        amount: CurrencyUtils.formatByUnit(
          parseFloat(
            web3?.utils?.fromWei(
              (bay?.totalValueLocked as string)?.toString() || '0',
              'ether'
            )
          ) * (sendWyreResponse.rates as any)?.USDTETH,
          'USD'
        ),
        year: '2021',
      },
    ],
    [bay, sendWyreResponse]
  );
  // const asyncFetch = () => {
  //   fetch(
  //     'https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json'
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  // React.useEffect(() => {
  //   asyncFetch();
  // }, []);

  const config: any = {
    data,
    xField: 'year',
    yField: 'amount',
    seriesField: 'name',
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  return (
    <div className={styles.container} style={{ marginTop: '15px' }}>
      {/* <Image src={PortfolioImage} layout="responsive" />
       */}
      <AdvancedChart
        widgetProps={{
          theme: 'dark',
          height: '78%',
          autosize: true,
          symbol: 'ETHUSDT',
        }}
      />
    </div>
  );
};

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
