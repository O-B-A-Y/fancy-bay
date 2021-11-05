import React from 'react';
import TextInputVariant from 'src/constants/textInputVariant';
import styles from './TextInput.module.scss';
import colors from '../../styles/colors.module.scss';
import clsx from 'clsx';

type TextInputProps = {
  backgroundColor: string;
  placeholder: string;
  placeholderStyle: Partial<{
    fontSize: number;
    color: string;
    textAlign: 'left' | 'right';
  }>;
  buttonText: string;
  borderWidth: number;
  buttonClassName: string;
  disabled: boolean;
  inputClassName: string;
  hasButton: boolean;
  onValueChanged: React.ChangeEventHandler;
  value: any;
  variant: TextInputVariant;
};

const TextInput: React.FC<Partial<TextInputProps>> = ({
  placeholder,
  buttonText,
  hasButton,
  onValueChanged,
  value,
  placeholderStyle,
  backgroundColor,
  borderWidth,
  buttonClassName,
  inputClassName,
  disabled,
  variant,
}) => (
  <>
    <div
      style={{
        padding: '10px 10px',
        borderRadius: 5,
        ...(hasButton && {
          justifyContent: 'space-between',
          display: 'flex',
        }),
        border: `${borderWidth || 0}px solid ${
          variant === TextInputVariant.outlined
            ? backgroundColor
            : colors.dark500
        }`,
        backgroundColor:
          variant === TextInputVariant.filled
            ? backgroundColor || 'transparent'
            : 'transparent',
      }}
    >
      <input
        className={clsx([styles.inputContainer, inputClassName])}
        onChange={onValueChanged}
        placeholder={placeholder}
        value={value}
        color={placeholderStyle?.color}
        style={{
          backgroundColor: 'transparent',
          border: '2px solid transparent',
          ...placeholderStyle,
        }}
        disabled
      />
      {hasButton && (
        <button
          type="submit"
          className={clsx([buttonClassName, styles.buttonContainer])}
        >
          {buttonText || 'Submit'}
        </button>
      )}
    </div>
  </>
);

export default React.memo(TextInput);
