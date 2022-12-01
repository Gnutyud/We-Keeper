import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AppContext from '../../store/context';
import styles from './MyProfile.module.scss';

const MyProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [profileData, setProfileData] = useState({ data: {}, totalNotes: 0 });
  const { auth } = useContext(AppContext);
  const navigate = useNavigate();
  const { data, totalNotes } = profileData;
  const { userId } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      if (userId || auth?.userInfo?.userId) {
        try {
          const response = await axiosPrivate.get(`/users/${userId || auth?.userInfo?.userId}`);
          setProfileData(response);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getProfile();
    // eslint-disable-next-line
  }, []);
  const handleDeleteAccount = async () => {
    try {
      if (userId || auth?.userInfo?.userId) {
        await axiosPrivate.delete('/users', { data: { id: userId || auth?.userInfo?.userId } });
        if (userId) {
          navigate('/admin');
        } else {
          navigate('/login');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>{userId ? `${data?.username}'s` : 'My'} profile</h2>

      <div className={styles.avatar}>
        <div className={styles.avatarImage}>
          {data?.avatar && <img src={data?.avatar} alt="avatar" />}
          {!data?.avatar && data?.username?.charAt(0)?.toUpperCase()}
        </div>
      </div>
      <dl className={styles.listField}>
        <dt className={styles.fieldLabel}>Username:</dt>
        <dd>{data?.username}</dd>
        <dt className={styles.fieldLabel}>Join date:</dt>
        <dd>{moment(data?.createdAt).format('LLLL')}</dd>
        <dt className={styles.fieldLabel}>Email:</dt>
        <dd>{data?.email}</dd>
        <dt className={styles.fieldLabel}>Status:</dt>
        <dd>{data?.status}</dd>
        <dt className={styles.fieldLabel}>Total Notes:</dt>
        <dd>{totalNotes}</dd>
      </dl>
      <div className={styles.dangrousZone}>
        <p className={styles.fieldLabel}>Delete {userId ? 'this' : 'your'} account</p>
        <p>
          it is possible to
          <button className={styles.deleteAccount} onClick={handleDeleteAccount}>
            delete {userId ? 'this' : 'your'} account
          </button>
          , but it is irreversible. Please be sure that you would like to do that.
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
