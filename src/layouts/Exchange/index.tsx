import React from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { Container, Flex, FlexItem } from '../../components';
import Divider from '../../components/Divider';
import SwitchNavigationButton from '../../components/SwitchNavigationButton';
import styles from './Exchange.module.scss';

interface ExchangeLayoutProps {
  myBayNames: string[];
}

// eslint-disable-next-line arrow-body-style
const Exchange: React.FC<ExchangeLayoutProps> = ({ myBayNames, children }) => {
  return (
    <Container className={styles.container}>
      <div className={styles.innerContainer}>
        {/* Select BAY Modal */}
        <Flex className={styles.selectBox} alignItems="center">
          <FlexItem className={styles.firstItem}>{myBayNames[0]}</FlexItem>
          <FlexItem>
            <IoIosArrowDropdownCircle className={styles.dropdownIcon} />
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
    </Container>
  );
};

export default Exchange;
