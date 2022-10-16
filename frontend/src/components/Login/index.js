import { useEffect, useState } from 'react';
import Button from '../UI/Button';
import style from './Login.module.scss';

const Login = () => {
  // without lib like formik and yub
  const initialValues = { email: '', password: '' };
  const initialErrors = { email: '', password: '', error: '', success: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    console.log('send request');
    // try {
    //   let res = await appApi.login(formValues);
    //   setFormErrors({ ...formErrors, success: 'Signed in successfully' });
    //   // store user info and go to the next page
    //   localStorage.setItem('refreshToken', res.user.refreshToken);
    //   JWTManager.setToken(res.user.token);
    //   navigate('/');
    // } catch (err: any) {
    //   if (err.message) {
    //     setFormErrors({ ...formErrors, error: err.message });
    //   }
    //   if (err.errors.message) {
    //     console.log(err.errors.message);
    //     setFormErrors({ ...formErrors, error: err.errors.message });
    //   }
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: '', error: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};
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
    return errors;
  };

  useEffect(() => {
    if (
      Object.keys(formErrors).length === 0 &&
      isSubmitting &&
      formValues.password &&
      formValues.email
    ) {
      submitForm();
    }
    // eslint-disable-next-line
  }, [formErrors, isSubmitting]);
  let url = '';

  return (
    <>
      <div className={style['login-container']}>
        <form className={style.center} onSubmit={(e) => handleSubmit(e)} noValidate>
          <h1>Sign In</h1>
          <p>Sign in and start starting take your notes!</p>
          <div className={style.message}>
            {formErrors?.success && <p className={style.successMsg}>{formErrors?.success}</p>}
            {formErrors?.error && <p className={style.errorMsg}>{formErrors?.error}</p>}
          </div>
          <div className={style.inputGroup}>
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
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href={url}>Forgot password?</a>
          </div>
          <Button type="submit" name="Login" />
        </form>
      </div>
    </>
  );
};

export default Login;
