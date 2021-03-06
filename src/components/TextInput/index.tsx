import clsx from 'clsx';
import React from 'react';
import TextInputVariant from 'src/constants/textInputVariant';
import colors from '../../styles/colors.module.scss';
import styles from './TextInput.module.scss';

type TextInputProps = {
  style: React.CSSProperties;
  backgroundColor: string;
  placeholder: string;
  label: string;
  placeholderStyle: Partial<{
    fontSize: number;
    color: string;
    textAlign: 'left' | 'right';
  }>;
  buttonText: string;
  borderWidth: number;
  buttonClassName: string;
  disabled?: boolean;
  inputClassName: string;
  hasButton: boolean;
  onValueChanged: React.ChangeEventHandler;
  onButtonClicked: () => void;
  value: any;
  variant: TextInputVariant;
};

const TextInput: React.FC<Partial<TextInputProps>> = ({
  style,
  label,
  placeholder,
  buttonText,
  hasButton,
  onValueChanged,
  onButtonClicked,
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
        ...style,
      }}
    >
      {label && (
        <p style={{ margin: 3, fontSize: 14, marginBottom: 5 }}>{label}</p>
      )}
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
        disabled={disabled}
      />
      {hasButton && (
        <button
          type="submit"
          onClick={onButtonClicked}
          className={clsx([buttonClassName, styles.buttonContainer])}
        >
          {buttonText || 'Submit'}
        </button>
      )}
    </div>
  </>
);

export default React.memo(TextInput);
