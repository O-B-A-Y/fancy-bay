import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

type TextAlign = 'left' | 'center' | 'right';

type ButtonSize = 'full' | 'fit';

const Button: React.FC<
  Partial<
    {
      children: ReactNode;
      backgroundColor: any;
      color: any;
      textAlign: TextAlign;
      paddingHorizontal: number;
      paddingVertical: number;
      marginHorizontal: number;
      marginVertical: number;
      size: ButtonSize;
      onClick: React.MouseEventHandler;
    } & React.HTMLAttributes<HTMLDivElement>
  >
> = ({
  children,
  backgroundColor,
  color,
  textAlign,
  paddingVertical,
  paddingHorizontal,
  size,
  onClick,
}) => (
  <>
    <button
      type="button"
      onClick={onClick}
      style={{
        width: size === 'full' ? '100%' : '',
        backgroundColor: backgroundColor || 'transparent',
        color: color || 'white',
        textAlign,
        padding: `${paddingVertical || 0}px ${paddingHorizontal || 0}px`,
        borderRadius: 5,
        ...styles,
      }}
      className={styles.container}
    >
      {children}
    </button>
  </>
);

export default Button;
