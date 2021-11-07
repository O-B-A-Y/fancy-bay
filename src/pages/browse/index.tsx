import clsx from 'clsx';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import BinanceIcon500x500 from '../../../public/icons/binance-icon-500x500.png';
import FintechIcon500x500 from '../../../public/icons/fintech-icon-500x500.png';
import { Container, Table } from '../../components';
import Flex from '../../components/Flex';
import StatsCard from '../../components/StatsCard';
import ContainerSize from '../../constants/containerSize';
import { DefaultLayout } from '../../layouts';
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

const mockBays: BrowseTableData[][] = [
  [
    {
      value: 'Binance',
      className: clsx(styles['bay-item'], styles['bay-item-name']),
    },
    {
      value: BinanceIcon500x500,
      isImage: true,
    },
    {
      value: StringUtils.shortenAddress(
        '0x18F16080a71d5F67fD1524410401323f297dE438',
        10
      ),
      className: clsx(styles['bay-item'], styles['bay-item-address']),
    },
    {
      value: NumberUtils.formatRank(1),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatSeparators(50000),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatSeparators(58670.905),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatPercentage(50),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatSeparators(10000),
      className: clsx(styles['bay-item']),
    },
  ],
  [
    {
      value: 'FinTech Club',
      className: clsx(styles['bay-item'], styles['bay-item-name']),
    },
    {
      value: FintechIcon500x500,
      isImage: true,
    },
    {
      value: StringUtils.shortenAddress(
        '0x460aDc7A9b5253A765e662A031D26C8743a2EbB6',
        10
      ),
      className: clsx(styles['bay-item'], styles['bay-item-address']),
    },
    {
      value: NumberUtils.formatRank(2),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatSeparators(11),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatSeparators(670.84),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatPercentage(20),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatSeparators(200),
      className: clsx(styles['bay-item']),
    },
  ],
];

const Browse: NextPageWithLayout = () => (
  <>
    <Head>
      <title>Browse | OBAY</title>
      <meta key="description" name="description" content="Browse OBAY" />
    </Head>
    <Container size={ContainerSize.ExtraLarge}>
      {/* Title section */}
      <div className={styles.infoTitleSection}>Platform Information</div>
      {/* Stats Card section */}
      <Flex colGap="xl">
        <StatsCard title="Number of Bays" stats={mockInformation.numOfBays} />
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
        <Table
          header={[
            { value: 'Name of Bay' },
            { value: 'Logo' },
            { value: 'Address' },
            { value: 'Rank' },
            { value: 'Number of members' },
            { value: 'Total value locked (TVL)' },
            { value: 'APR' },
            { value: 'Number of exchanges' },
          ]}
          headerRowClassName={styles.headerRow}
          rowStyle={{
            cursor: 'pointer',
          }}
          data={mockBays}
        />
      </div>
    </Container>
  </>
);

Browse.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Browse;
