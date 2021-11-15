import { useState } from 'react';

/**
 * @function useFormValidation
 * @description A custom hook used for managing and validating form values
 * @param {*} initialFormValues - initial form values
 * @param {Function} validate - Optional. A function validate form values `(formValues) => { valid: Boolean, errors: { [key:string]: error } }`
 */
function useFormValidation<S = {}>(
  initialFormValues: S,
  validate = (formValues: S) => ({ valid: true, errors: [], formValues })
) {
  const [errors, setErrors] = useState<S | {}>({});
  const [formValues, setFormValues] = useState<S>(initialFormValues);

  // TODO i18n
  //   const translateError = (message) => (message ? i18n.t(message) : '');

  const handleSetFieldValue = (
    name: keyof typeof initialFormValues,
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options?: {
      isNumeric: boolean;
    }
  ) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSetMultipleFieldValues = (newFieldValues: any) => {
    setFormValues({ ...formValues, ...newFieldValues });
  };

  const handleResetFormValues = () => {
    setFormValues(initialFormValues);
    setErrors({});
  };

  const handleResetFieldError = (name: any) => {
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (callback: Function) => {
    const validation = validate(formValues);
    if (validation.valid) {
      callback(formValues);
    } else {
      setErrors(validation.errors);
    }
  };

  return {
    valid: validate(formValues).valid,
    formValues,
    setFormValues,
    errors,
    setErrors,
    // translateError,
    handleSetFieldValue,
    handleSetMultipleFieldValues,
    handleResetFormValues,
    handleResetFieldError,
    handleSubmit,
  };
}

export default useFormValidation;
