import React, { ReactNode } from 'react';
import ButtonSize from 'src/constants/buttonConstant';
import ButtonVariant from 'src/constants/buttonVariant';
import TextAlign from 'src/constants/textAlign';
import styles from './Button.module.scss';
import colors from '../../styles/colors.module.scss';

const Button: React.FC<
  Partial<
    {
      children: ReactNode;
      backgroundColor: any;
      color: any;
      variant: ButtonVariant;
      textAlign: TextAlign;
      paddingHorizontal: number;
      paddingVertical: number;
      marginHorizontal: number;
      marginVertical: number;
      borderWidth: number;
      size: ButtonSize;
      onClick: React.MouseEventHandler;
    } & React.HTMLAttributes<HTMLDivElement>
  >
> = ({
  children,
  backgroundColor,
  color,
  textAlign,
  variant,
  paddingVertical,
  paddingHorizontal,
  borderWidth,
  size,
  onClick,
}) => (
  <>
    <button
      type="button"
      onClick={onClick}
      style={{
        border: `${borderWidth || 0}px solid ${
          variant === ButtonVariant.outlined ? backgroundColor : colors.dark500
        }`,
        width: size === ButtonSize.full ? '100%' : '',
        backgroundColor:
          variant === ButtonVariant.filled
            ? backgroundColor || 'transparent'
            : 'transparent',
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
