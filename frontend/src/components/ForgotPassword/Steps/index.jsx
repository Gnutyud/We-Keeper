import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import appApi from '../../../services/appApi';
import { Button } from '../../UI/Button';
import SuccessModal from '../../UI/SuccessModal';
import TextInput from '../../UI/TextInput';
import style from './Steps.module.scss';

export const FirstStep = ({ setStepPageNumber, formValues, setFormValues, formErrors, setFormErrors }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async () => {
    try {
      setLoading(true);
      await appApi.sendRequestResetPassword({ email: formValues.email });
      setLoading(false);
      setStepPageNumber(1);
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message) {
        setFormErrors({ ...formErrors, error: err.response.data.message });
      } else if (err.errors?.message) {
        console.log(err.errors.message);
        setFormErrors({ ...formErrors, error: err.errors.message });
      } else {
        setFormErrors({ ...formErrors, error: err.message });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: '', error: '' });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = 'Cannot be blank';
    } else if (!regex.test(values.email)) {
      errors.email = 'Invalid email format';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting && formValues.email) {
      submitForm();
    }
    // eslint-disable-next-line
  }, [formErrors, isSubmitting]);

  return (
    <div className={style.steps}>
      <form className={style.center} onSubmit={(e) => handleSubmit(e)} noValidate>
        <h2>Forgot password?</h2>
        <p className={style.desc}>No worries, we will send you reset instructions.</p>
        <div className={style.message}>
          {formErrors?.success && <p className={style.successMsg}>{formErrors?.success}</p>}
          {formErrors?.error && <p className={style.errorMsg}>{formErrors?.error}</p>}
        </div>
        <TextInput
          fieldName="Email:"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formValues.email}
          onChange={handleChange}
          error={formErrors.email}
        />
        <Button type="submit" name="Reset password" loading={loading} />
        <div className={style.loginBtn}>
          <button type="button" onClick={() => navigate('/login')}>
            <BsArrowLeft />
            Back to log in
          </button>
        </div>
      </form>
    </div>
  );
};

export const SecondStep = ({ formValues }) => {
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleOpenEmail = () => {
    window.open(`mailto:${formValues.email}`);
  };

  const handleResendEmail = async () => {
    try {
      await appApi.sendRequestResetPassword({ email: formValues.email });
      setIsShowSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.steps}>
      <div className={style.center}>
        <h2>Check your email</h2>
        <p className={style.desc}>We sent a password reset link to {formValues.email}</p>
        <div className={style.space} />
        <Button type="button" name="Open email app" onClick={handleOpenEmail} />
        <div className={style.linkDesc}>
          Didn&apos;t receive the email?
          <button type="button" onClick={handleResendEmail}>
            Click to resend
          </button>
        </div>
        <div className={style.loginBtn}>
          <button type="button" onClick={() => navigate('/login')}>
            <BsArrowLeft />
            Back to log in
          </button>
        </div>
      </div>
      {isShowSuccess && <SuccessModal duration={2000} onClose={() => setIsShowSuccess(false)} />}
    </div>
  );
};

export const SetNewPassword = () => {
  const initialValues = { email: '', newPassword: '', confirmNewPassword: '' };
  const initialErrors = { email: '', newPassword: '', confirmNewPassword: '', error: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token, userId } = useParams();

  const submitForm = async () => {
    try {
      setLoading(true);
      const res = await appApi.resetPassword({ token, userId, password: formValues.newPassword });
      setLoading(false);
      setFormErrors({ ...formErrors, success: res.message });
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message) {
        setFormErrors({ ...formErrors, error: err.response.data.message });
      } else if (err.errors?.message) {
        console.log(err.errors.message);
        setFormErrors({ ...formErrors, error: err.errors.message });
      } else {
        setFormErrors({ ...formErrors, error: err.message });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: '', error: '' });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.newPassword) {
      errors.newPassword = 'Cannot be blank';
    } else if (values.newPassword.length < 6) {
      errors.newPassword = 'Password must be more than 6 characters';
    }
    if (!values.confirmNewPassword) {
      errors.confirmNewPassword = 'Cannot be blank';
    }
    if (values.newPassword && values.confirmNewPassword && values.newPassword !== values.confirmNewPassword) {
      errors.confirmNewPassword = 'Password not match!';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting && formValues.newPassword) {
      submitForm();
    }
    // eslint-disable-next-line
  }, [formErrors, isSubmitting]);

  return (
    <div className={style.steps}>
      <form className={style.center} onSubmit={(e) => handleSubmit(e)} noValidate>
        <h2>Set new password</h2>
        <p className={style.desc}>Your new password must be different to previously used passwords.</p>
        <div className={style.message}>
          {formErrors?.success && <p className={style.successMsg}>{formErrors?.success}</p>}
          {formErrors?.error && <p className={style.errorMsg}>{formErrors?.error}</p>}
        </div>
        <TextInput
          type="password"
          fieldName="New password:"
          name="newPassword"
          id="newPassword"
          value={formValues.newPassword}
          onChange={handleChange}
          error={formErrors.newPassword}
        />
        <TextInput
          type="password"
          fieldName="Confirm new password:"
          name="confirmNewPassword"
          id="confirmNewPassword"
          value={formValues.confirmNewPassword}
          onChange={handleChange}
          error={formErrors.confirmNewPassword}
        />
        <Button type="submit" name="Reset password" loading={loading} />
        <div className={style.loginBtn}>
          <button type="button" onClick={() => navigate('/login')}>
            <BsArrowLeft />
            Back to log in
          </button>
        </div>
      </form>
    </div>
  );
};
