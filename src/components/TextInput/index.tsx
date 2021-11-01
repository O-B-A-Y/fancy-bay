import React from 'react';
import styles from './TextInput.module.scss';

const TextInput: React.FC<
  Partial<{
    placeholder: string;
    buttonText: string;
    hasButton: boolean;
    onValueChanged: React.ChangeEventHandler;
    value: any;
  }>
> = ({ placeholder, buttonText, hasButton, onValueChanged, value }) => (
  <>
    <div className={styles[`TextInput-container`]}>
      <input
        onChange={onValueChanged}
        value={value}
        placeholder={placeholder}
      />
      {hasButton && <button type="submit">{buttonText || 'Submit'}</button>}
    </div>
  </>
);

export default TextInput;
