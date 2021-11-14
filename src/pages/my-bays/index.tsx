import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import { useAppDispatch } from 'src/states/hooks';
import { toggleBayCreationModal } from 'src/states/modal/slice';
import BinanceIcon500x500 from '../../../public/icons/binance-icon-500x500.png';
import FintechIcon500x500 from '../../../public/icons/fintech-icon-500x500.png';
import { Container, Table, TextInput, Button } from '../../components';
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
  const dispatch = useAppDispatch();
  const handler = {
    AddNewBay: () => {
      dispatch(toggleBayCreationModal(true));
    },
  };
  return (
    <Container size={ContainerSize.Large}>
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
            <Flex direction="row">
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
              <Button
                backgroundColor="#303030"
                borderWidth={1.5}
                color="white"
                variant={ButtonVariant.filled}
                size={ButtonSize.full}
                textAlign={TextAlign.center}
                paddingVertical={10}
                paddingHorizontal={20}
                onClick={handler.AddNewBay}
              >
                Add new bay <FaPlus style={{ fontSize: 10, marginLeft: 10 }} />
              </Button>
            </Flex>
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
