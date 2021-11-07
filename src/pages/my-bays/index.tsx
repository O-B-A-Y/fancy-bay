import clsx from 'clsx';
import React, { ReactElement } from 'react';
import BinanceIcon500x500 from '../../../public/icons/binance-icon-500x500.png';
import FintechIcon500x500 from '../../../public/icons/fintech-icon-500x500.png';
import { Container, Table, TextInput } from '../../components';
import Flex from '../../components/Flex';
import FlexItem from '../../components/FlexItem';
import ContainerSize from '../../constants/containerSize';
import TextInputVariant from '../../constants/textInputVariant';
import { DefaultLayout } from '../../layouts';
import colors from '../../styles/colors.module.scss';
import NumberUtils from '../../utils/number';
import StringUtils from '../../utils/string';
import { NextPageWithLayout } from '../_app';
import styles from './MyBays.module.scss';

interface BrowseTableData {
  value: string | number | StaticImageData;
  className?: string;
  style?: React.CSSProperties;
  isImage?: boolean;
}

const mockMyBays: BrowseTableData[][] = [
  [
    {
      value: 'Binance',
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
      value: NumberUtils.formatSeparators(58670.905),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatSeparators(50000),
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
      value: NumberUtils.formatSeparators(670.84),
      className: clsx(styles['bay-item']),
    },
    {
      value: NumberUtils.formatSeparators(11),
      className: clsx(styles['bay-item']),
    },
  ],
];

// eslint-disable-next-line arrow-body-style
const MyBays: NextPageWithLayout = () => {
  return (
    <Container size={ContainerSize.ExtraLarge}>
      <div className={styles.container}>
        {/* MyBay Header section */}
        <Flex
          className={styles.myBaysHeaderSection}
          direction="row"
          alignItems="baseline"
        >
          <FlexItem className={styles.firstItem}>
            <span
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            >
              MyBays
            </span>
          </FlexItem>
          <FlexItem>
            <TextInput
              hasButton
              variant={TextInputVariant.outlined}
              borderWidth={1}
              backgroundColor={colors.dark500}
              placeholder="Search for your Bays"
              inputClassName={styles.baySearchInput}
              placeholderStyle={{
                color: 'white',
              }}
              buttonClassName={styles.inputButton}
              buttonText="Search"
            />
          </FlexItem>
        </Flex>
        {/* Divider */}
        <div className={styles.divider} />
        {/* MyBays table of items  */}
        <Table
          header={[
            {
              value: 'Name',
            },
            { value: 'Logo' },

            { value: 'Address' },
            { value: 'Total Value Locked (TVL)' },
            { value: 'Members' },
          ]}
          tableClassName={styles.tableContainer}
          headerRowClassName={styles.headerRow}
          rowClassName={styles.tableRow}
          data={mockMyBays}
        />
      </div>
    </Container>
  );
};

MyBays.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyBays;
