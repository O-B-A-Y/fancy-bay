import React from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Flex, FlexItem } from '../../components';
import Divider from '../../components/Divider';
import SwitchNavigationButton from '../../components/SwitchNavigationButton';
import MyBaysSelectionModal from '../../modals/MyBaysSelectionModal';
import { useAppSelector } from '../../states/hooks';
import useMyBaysSelectionModal from '../../states/modal/hooks/useMyBaysSelectionModal';
import useFetchYourTreasureBays from '../../states/treasureBay/hooks/useFetchYourTreasureBays';
import colors from '../../styles/colors.module.scss';
import styles from './Exchange.module.scss';

interface ExchangeLayoutProps {}

// eslint-disable-next-line arrow-body-style
const Exchange: React.FC<ExchangeLayoutProps> = ({ children }) => {
  const { open } = useMyBaysSelectionModal();
  const myBay = useAppSelector((state) => state.exchangeSlice.data.myBay);

  const { bays, error, retries } = useFetchYourTreasureBays();
  if (error && retries === 0) {
    toast.error(`ERROR! Cannot retrieve list of MyBays! (${error})`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <Container className={styles.container}>
      <div className={styles.innerContainer}>
        {/* Select BAY Modal */}
        <Flex className={styles.selectBox} alignItems="center">
          <FlexItem className={styles.firstItem}>
            {myBay?.name ?? (
              <span className={styles.placeholder}>Please select a Bay</span>
            )}
          </FlexItem>
          <FlexItem>
            <IoIosArrowDropdownCircle
              className={styles.dropdownIcon}
              onClick={open}
            />
          </FlexItem>
        </Flex>
        {/* Divider */}
        <Divider />
        {/* Interactive Section */}
        <Flex
          direction="column"
          className={styles.interactiveSection}
          rowGap="md"
        >
          <SwitchNavigationButton
            labels={[
              {
                name: 'Swap',
                path: '/exchange/swap',
              },
              {
                name: 'Liquidity',
                path: '/exchange/liquidity',
              },
            ]}
          />
          {children}
        </Flex>
      </div>
      {/* MyBaysSelectionModal */}
      <MyBaysSelectionModal myBays={bays} />
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: colors.dark800,
        }}
      />
    </Container>
  );
};

export default Exchange;
