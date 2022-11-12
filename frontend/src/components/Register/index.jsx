import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appApi from '../../services/appApi';
import Button from '../UI/Button';
import style from './Register.module.scss';

function Register() {
  // without lib like formik and yub
  const initialValues = { email: '', password: '', username: '' };
  const initialErrors = { email: '', password: '', username: '', error: '', success: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async () => {
    try {
      setLoading(true);
      await appApi.register(formValues);
      setLoading(false);
      setFormErrors({ ...formErrors, success: 'Signed up successfully' });
      navigate('/login');
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
    if (!values.password) {
      errors.password = 'Cannot be blank';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be more than 6 characters';
    }
    if (!values.username) {
      errors.username = 'Cannot be blank';
    } else if (values.username.length < 4) {
      errors.username = 'Username must be more than 4 characters';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (
      Object.keys(formErrors).length === 0 &&
      isSubmitting &&
      formValues.password &&
      formValues.email &&
      formValues.username
    ) {
      submitForm();
    }
    // eslint-disable-next-line
  }, [formErrors, isSubmitting]);

  return (
    <div className={style['login-container']}>
      <form className={style.center} onSubmit={(e) => handleSubmit(e)} noValidate>
        <h1>Sign Up</h1>
        <p>Give us some of your information to get free access to fieldly!</p>
        <div className={style.message}>
          {formErrors?.success && <p className={style.successMsg}>{formErrors?.success}</p>}
          {formErrors?.error && <p className={style.errorMsg}>{formErrors?.error}</p>}
        </div>
        <div className={style.inputGroup}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <p>{formErrors.email}</p>
        </div>
        <div className={style.inputGroup}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
          <p>{formErrors.username}</p>
        </div>
        <div className={style.inputGroup}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
          <p>{formErrors.password}</p>
        </div>
        <div className={style.forgot}>
          <div className={style.checkbox}>
            <input type="checkbox" name="remember" id="remember" />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="remember">
              By creating an account you agree to the terms of use and our privacy policy
            </label>
          </div>
        </div>
        <Button type="submit" name="Sign Up" loading={loading} />
        <div className={style.signUp}>
          Already have an account?
          <button type="button" onClick={() => navigate('/login')}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
