import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Flex from '../Flex';
import FlexItem from '../FlexItem';
import styles from './SwitchNavigationButton.module.scss';

interface SwitchLabel {
  name: string;
  path: string;
}

interface SwitchButtonProps {
  labels: SwitchLabel[];
}

const SwitchNavigationButton: React.FC<SwitchButtonProps> = ({ labels }) => {
  const router = useRouter();
  return (
    <>
      {/* Switch Mode (Swap | Liquidity) */}
      <Flex direction="row" className={styles.switchBox}>
        {labels.map((l, index) => (
          <Link href={l.path} passHref key={index.toString()}>
            <FlexItem
              className={clsx([
                styles.switchButton,
                {
                  [styles.active]: l.path === router.pathname,
                },
              ])}
              flex="one"
              alignSelf="stretch"
            >
              <a>{l.name}</a>
            </FlexItem>
          </Link>
        ))}
        {/* Swap Switch */}
      </Flex>
    </>
  );
};

export default SwitchNavigationButton;
