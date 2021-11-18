import clsx from 'clsx';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import Loader from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import useWeb3 from 'src/hooks/useWeb3';
import useFetchTreasureBay from 'src/states/treasureBay/hooks/useFetchTreasureBays';
import BinanceIcon500x500 from '../../../public/icons/binance-icon-500x500.png';
// import FintechIcon500x500 from '../../../public/icons/fintech-icon-500x500.png';
import { Container, Table } from '../../components';
import Flex from '../../components/Flex';
import StatsCard from '../../components/StatsCard';
import { DefaultLayout } from '../../layouts';
import colors from '../../styles/colors.module.scss';
import NumberUtils from '../../utils/number';
import StringUtils from '../../utils/string';
import { NextPageWithLayout } from '../_app';
import styles from './Browse.module.scss';

interface BrowseTableData {
  value: string | number | StaticImageData;
  className?: string;
  style?: React.CSSProperties;
  isImage?: boolean;
}

const mockInformation = {
  numOfBays: 120,
  epoch: 358,
  avgBayROI: 55.8,
  numOfExchanges: 187,
};

const Browse: NextPageWithLayout = () => {
  const web3 = useWeb3();
  const { bays, error, loading } = useFetchTreasureBay();
  const convertedBays: { data: BrowseTableData[]; href: string }[] = bays.map(
    (bay, index) => ({
      data: [
        {
          value: NumberUtils.formatRank(index + 1),
          className: clsx(styles['bay-item']),
        },
        {
          value: bay.name,
          className: clsx(styles['bay-item'], styles['bay-item-name']),
        },
        {
          value: BinanceIcon500x500,
          isImage: true,
        },
        {
          value: StringUtils.shortenAddress(bay.address, 10),
          className: clsx(styles['bay-item'], styles['bay-item-address']),
        },

        {
          value: NumberUtils.formatSeparators(bay.members.length),
          className: clsx(styles['bay-item']),
        },
        {
          value: NumberUtils.formatSeparators(
            parseFloat(web3.utils.fromWei(bay.totalValueLocked, 'ether'))
          ),
          className: clsx(styles['bay-item']),
        },
        {
          value: StringUtils.shortenAddress(bay.creator, 10),
          className: clsx(styles['bay-item'], styles['bay-item-address']),
        },
        {
          value: NumberUtils.formatSeparators(
            bay.transferProposals.length + bay.exchangeProposals.length
          ),
          className: clsx(styles['bay-item']),
        },
      ],
      href: `/bays/${bay.address}`,
    })
  );
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return (
    <>
      <Head>
        <title>Browse | OBAY</title>
        <meta key="description" name="description" content="Browse OBAY" />
      </Head>
      <Container>
        {/* Title section */}
        <div className={styles.infoTitleSection}>Platform Information</div>
        {/* Stats Card section */}
        <Flex colGap="xl">
          <StatsCard title="Number of Bays" stats={bays.length} />
          <StatsCard title="Epoch" stats={mockInformation.epoch} />
          <StatsCard title="Avg. Bay ROI" stats={mockInformation.avgBayROI} />
          <StatsCard
            title="Number of Exchanges"
            stats={mockInformation.numOfExchanges}
          />
        </Flex>
        {/* Bay Title section */}
        <div className={styles.bayTitleSection}>Bays</div>
        {/* Table of Bays */}
        <div className={styles.tableContainer}>
          {loading && (
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '600px',
                display: 'flex',
              }}
            >
              <Loader type="Grid" color="#49fdc0" height={100} width={100} />
            </div>
          )}
          {bays.length > 0 ? (
            <Table
              header={[
                { value: 'Rank' },
                {
                  value: 'Name',
                },
                { value: 'Logo' },
                { value: 'Address' },
                { value: 'Members' },
                { value: 'Total staked amount' },
                { value: 'Creator' },
                { value: 'Number of proposals' },
              ]}
              headerRowClassName={styles.headerRow}
              rowStyle={{
                cursor: 'pointer',
              }}
              items={convertedBays}
            />
          ) : (
            !loading && (
              <div
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '600px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <p style={{ margin: 0, fontSize: 150, color: colors.dark500 }}>
                  ☹︎
                </p>
                <h3 style={{ color: colors.dark500 }}>
                  There are no Treasure Bay on the network
                </h3>
              </div>
            )
          )}
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

Browse.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Browse;
