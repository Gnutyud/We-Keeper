import React, { useContext, useEffect, useState } from 'react';
import { IoImagesOutline } from 'react-icons/io5';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AppContext from '../../store/context';
import Button from '../UI/Button';
import SuccessModal from '../UI/SuccessModal';
import TextInput from '../UI/TextInput';
import styles from './MySetting.module.scss';

const MySetting = () => {
  const initialValues = {
    avatar: '',
    status: '',
    email: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  const initialErrors = {
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    email: '',
    error: '',
    success: '',
  };
  const { auth, profile } = useContext(AppContext);
  const [formValues, setFormValues] = useState({
    ...initialValues,
    username: profile.username,
    email: profile.email,
    avatar: profile.avatar,
    status: profile.status,
  });
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const submitForm = async () => {
    try {
      if (auth?.userInfo?.userId) {
        setLoading(true);
        await axiosPrivate.patch('/users', { ...formValues, id: auth.userInfo.userId });
        setLoading(false);
        setFormErrors({ ...formErrors, success: 'Saved successfully' });
        setFormValues((values) => ({
          ...values,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }));
        setIsShowSuccess(true);
      }
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message) {
        setFormErrors({ ...formErrors, [err.response.data.field]: err.response.data.message });
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
    if (values.currentPassword) {
      if (!values.newPassword) {
        errors.newPassword = 'Cannot be blank';
      }
      if (!values.confirmNewPassword) {
        errors.confirmNewPassword = 'Cannot be blank';
      }
      if (values.newPassword.length < 6) {
        errors.newPassword = 'Password must be more than 6 characters';
      }
      if (
        values.newPassword &&
        values.confirmNewPassword &&
        values.newPassword !== values.confirmNewPassword
      ) {
        errors.confirmNewPassword = 'Password not match!';
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting && formValues.username && formValues.email) {
      submitForm();
    }
    // eslint-disable-next-line
  }, [formErrors, isSubmitting]);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (/^image\//.test(file.type)) {
      const formData = new FormData();
      formData.append('file', file);
      const pathRes = await axiosPrivate.post('/upload', formData);
      setFormValues((prev) => ({
        ...prev,
        avatar: pathRes.url,
      }));
    } else {
      console.log('You could only upload images');
    }
  };

  return (
    <div className={styles.setting}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>My settings</h2>
        <div className={styles.avatar}>
          <p className={styles.fieldLabel}>Avatar:</p>
          <div className={styles.avatarImage}>
            {formValues?.avatar && <img src={`data:image/png;base64, ${formValues?.avatar}`} alt="avatar" />}
            {!formValues?.avatar && formValues?.username?.charAt(0)?.toUpperCase()}
            <div className={styles.uploadImage}>
              <label htmlFor="imageUpload">
                <IoImagesOutline size={16} />
                <input
                  id="imageUpload"
                  type="file"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleUploadImage}
                />
              </label>
            </div>
          </div>
        </div>
        <div className={styles.listField}>
          <TextInput
            fieldName="Username:"
            name="username"
            id="username"
            value={formValues.username}
            onChange={handleChange}
            error={formErrors.username}
          />
          <TextInput
            type="password"
            fieldName="Current password:"
            name="currentPassword"
            id="currentPassword"
            value={formValues.currentPassword}
            onChange={handleChange}
            error={formErrors.currentPassword}
          />
          <TextInput
            fieldName="Status:"
            name="status"
            id="status"
            value={formValues.status}
            onChange={handleChange}
          />
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
            fieldName="Email:"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            error={formErrors.email}
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
        </div>
        <div className={styles.submit}>
          <Button width="100px" type="submit" name="Save" loading={loading} />
        </div>
      </form>
      {isShowSuccess && <SuccessModal duration={2000} onClose={() => setIsShowSuccess(false)} />}
    </div>
  );
};

export default MySetting;
