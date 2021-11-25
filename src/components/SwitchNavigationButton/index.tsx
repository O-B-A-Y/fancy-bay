import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Flex from '../Flex';
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
            <a
              style={{
                flex: '1 1 0%',
                alignSelf: 'stretch',
              }}
            >
              <div
                className={clsx([
                  styles.switchButton,
                  {
                    [styles.active]: l.path === router.pathname,
                  },
                ])}
              >
                {l.name}
              </div>
            </a>
          </Link>
        ))}
        {/* Swap Switch */}
      </Flex>
    </>
  );
};

export default SwitchNavigationButton;
