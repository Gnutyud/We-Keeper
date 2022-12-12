import React, { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TfiFacebook } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import appApi from '../../services/appApi';
import AppContext from '../../store/context';
import { Button, ButtonWithIcon } from '../UI/Button';
import TextInput from '../UI/TextInput';
import style from './Login.module.scss';

function Login() {
  // without lib like formik and yub
  const initialValues = { username: '', password: '' };
  const initialErrors = { username: '', password: '', error: '', success: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AppContext);

  const submitForm = async () => {
    try {
      setLoading(true);
      const res = await appApi.login(formValues);
      setLoading(false);
      setFormErrors({ ...formErrors, success: 'Signed in successfully' });
      setAuth(res);
      navigate('/');
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
    if (!values.username) {
      errors.username = 'Cannot be blank';
    } else if (values.username.length < 4) {
      errors.username = 'Username must be more than 4 characters';
    }
    if (!values.password) {
      errors.password = 'Cannot be blank';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be more than 6 characters';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting && formValues.password && formValues.username) {
      submitForm();
    }
    // eslint-disable-next-line
  }, [formErrors, isSubmitting]);

  const authWithGoogle = () => {
    window.open(`${process.env.REACT_APP_BASE_URL}/auth/google`, '_self');
  };

  return (
    <div className={style['login-container']}>
      <form className={style.center} onSubmit={(e) => handleSubmit(e)} noValidate>
        <h1>Sign In</h1>
        <p className={style.desc}>Sign in and start starting take your notes!</p>
        <div className={style.message}>
          {formErrors?.success && <p className={style.successMsg}>{formErrors?.success}</p>}
          {formErrors?.error && <p className={style.errorMsg}>{formErrors?.error}</p>}
        </div>
        <div className={style.loginWith}>
          <ButtonWithIcon
            type="button"
            name="Login With Google"
            icon={<FcGoogle />}
            customStyles={{ backgroundColor: 'white' }}
            onClick={authWithGoogle}
          />
          <ButtonWithIcon
            type="button"
            name="Login With Facebook"
            icon={<TfiFacebook />}
            customStyles={{ backgroundColor: '#4267B2', color: 'white' }}
          />
        </div>
        <p className={style.desc} style={{ marginTop: '40px' }}>
          -OR-
        </p>
        <TextInput
          fieldName="Username:"
          name="username"
          id="username"
          placeholder="Enter your username"
          value={formValues.username}
          onChange={handleChange}
          error={formErrors.username}
        />
        <TextInput
          fieldName="Password:"
          name="password"
          id="password"
          placeholder="Enter your password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          error={formErrors.password}
        />
        <div className={style.forgot}>
          <div className={style.checkbox}>
            <input type="checkbox" name="remember" id="remember" />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="button">Forgot password?</button>
        </div>
        <Button type="submit" name="Login" loading={loading} />
        <div className={style.signUp}>
          Don&apos;t have an account?
          <button type="button" onClick={() => navigate('/register')}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
