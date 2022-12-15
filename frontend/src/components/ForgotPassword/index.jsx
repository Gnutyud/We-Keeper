import React, { useState } from 'react';
import { FirstStep, SecondStep } from './Steps';

const FORGOT_PASSWORD_PAGE_STEPS = [
  {
    id: 0,
    name: 'first step',
    component: FirstStep,
  },
  {
    id: 1,
    name: 'second step',
    component: SecondStep,
  },
];

const ForgotPassword = () => {
  const [stepPageNumber, setStepPageNumber] = useState(0);
  const initialValues = { email: '', newPassword: '', confirmNewPassword: '' };
  const initialErrors = { email: '', newPassword: '', confirmNewPassword: '', error: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const CurrentPage = FORGOT_PASSWORD_PAGE_STEPS[stepPageNumber].component;

  return (
    <CurrentPage
      setStepPageNumber={setStepPageNumber}
      formValues={formValues}
      setFormValues={setFormValues}
      formErrors={formErrors}
      setFormErrors={setFormErrors}
    />
  );
};

export default ForgotPassword;
