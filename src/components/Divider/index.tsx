import clsx from 'clsx';
import React from 'react';
import styles from './Divider.module.scss';

interface DividerProps {
  className?: string;
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({ className, style }) => {
  const classNames = clsx({
    [styles.divider]: true,
    [`${className}`]: className,
  });
  return <div className={classNames} style={style} />;
};

export default Divider;
