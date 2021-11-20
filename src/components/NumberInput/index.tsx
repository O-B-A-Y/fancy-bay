import clsx from 'clsx';
import React from 'react';
import styles from './NumberInput.module.scss';

interface NumberInputProps {
  style?: React.CSSProperties;
  className?: string;
  onChange?: () => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  style,
  className,
  onChange,
}) => {
  const classNames = clsx({
    [styles.input]: true,
    [`${className}`]: className,
  });
  return (
    <input
      type="number"
      className={classNames}
      placeholder="0.0"
      style={style}
      onChange={onChange}
    />
  );
};

export default NumberInput;
