import clsx from 'clsx';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import useFormValidation from 'src/hooks/useFormValidation';
import useWeb3 from 'src/hooks/useWeb3';
import { useAppDispatch } from 'src/states/hooks';
import { toggleBayCreationModal } from 'src/states/modal/slice';
import useFetchYourTreasureBays from 'src/states/treasureBay/hooks/useFetchYourTreasureBays';
import BinanceIcon500x500 from '../../../public/icons/binance-icon-500x500.png';
// import FintechIcon500x500 from '../../../public/icons/fintech-icon-500x500.png';
import { Button, Container, Table, TextInput } from '../../components';
import Divider from '../../components/Divider';
import Flex from '../../components/Flex';
import FlexItem from '../../components/FlexItem';
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

// eslint-disable-next-line arrow-body-style
const MyBays: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const web3 = useWeb3();
  const { formValues, handleSetFieldValue } = useFormValidation({
    searchInput: '',
  });
  const { bays, loading, error } = useFetchYourTreasureBays();
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  const fetchedTreasureBays: { data: BrowseTableData[]; href: string }[] =
    React.useMemo(
      () =>
        bays
          .filter((bay) =>
            (bay.name as string)
              .toLowerCase()
              .includes(formValues.searchInput.toLowerCase())
          )
          .map((bay) => ({
            href: `/my-bays/${bay.address}/proposals`,
            data: [
              {
                value: bay.name,
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
                value: StringUtils.shortenAddress(bay.creator, 10),
                className: clsx(styles['bay-item'], styles['bay-item-address']),
              },
              {
                value: NumberUtils.formatSeparators(
                  parseFloat(web3.utils.fromWei(bay.totalValueLocked, 'ether'))
                ),
                className: clsx(styles['bay-item']),
              },
              {
                value: NumberUtils.formatSeparators(bay.members.length),
                className: clsx(styles['bay-item']),
              },
              {
                value: NumberUtils.formatSeparators(
                  bay.exchangeProposals.length + bay.transferProposals.length
                ),
                className: clsx(styles['bay-item']),
              },
            ],
          })),
      [bays, formValues.searchInput]
    );
  const handler = {
    AddNewBay: () => {
      dispatch(toggleBayCreationModal(true));
    },
  };
  return (
    <>
      <Head>
        <title>MyBays | OBAY</title>
        <meta key="description" name="description" content="Exchange OBAY" />
      </Head>
      <Container>
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
                  onValueChanged={(e) =>
                    handleSetFieldValue('searchInput', (e.target as any).value)
                  }
                  placeholderStyle={{
                    color: 'white',
                  }}
                  buttonClassName={styles.inputButton}
                  buttonText="Search"
                />
                <Button
                  backgroundColor="#303030"
                  borderWidth={1.5}
                  variant={ButtonVariant.filled}
                  size={ButtonSize.full}
                  textAlign={TextAlign.center}
                  paddingVertical={10}
                  paddingHorizontal={20}
                  onClick={handler.AddNewBay}
                >
                  Add new bay{' '}
                  <FaPlus style={{ fontSize: 10, marginLeft: 10 }} />
                </Button>
              </Flex>
            </FlexItem>
          </Flex>
          {/* Divider */}
          <Divider />
          {/* MyBays table of items  */}
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
                {
                  value: 'Name',
                },
                { value: 'Logo' },

                { value: 'Address' },
                { value: 'Creator' },
                { value: 'Total Staked Amount' },
                { value: 'Members' },
                { value: 'Proposals' },
              ]}
              tableClassName={styles.tableContainer}
              headerRowClassName={styles.headerRow}
              rowClassName={styles.tableRow}
              items={fetchedTreasureBays}
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
                  ☃︎
                </p>
                <h3 style={{ color: colors.dark500 }}>
                  You have no treasure bays, create one now!
                </h3>
              </div>
            )
          )}
        </div>
      </Container>
    </>
  );
};

MyBays.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default MyBays;
