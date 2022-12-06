import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AppContext from '../../store/context';
import ConfirmModal from '../UI/ConfirmModal';
import Loading from '../UI/Loading';
import styles from './MyProfile.module.scss';

const MyProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth, profile, setProfile } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { avatar, username, joinDate, status, totalNotes, email } = profile;

  useEffect(() => {
    const getProfile = async () => {
      if (userId || auth?.userInfo?.userId) {
        try {
          setLoading(true);
          const response = await axiosPrivate.get(`/users/${userId || auth?.userInfo?.userId}`);
          setProfile({
            username: response.data.username,
            email: response.data.email,
            roles: response.data.roles,
            status: response.data.status,
            avatar: response.data.avatar,
            joinDate: response.data.createdAt,
            totalNotes: response.totalNotes,
          });
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
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

  if (loading) return <Loading styles={{ height: '100%' }} />;

  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>{userId ? `${username}'s` : 'My'} profile</h2>

      <div className={styles.avatar}>
        <div className={styles.avatarImage}>
          {avatar && <img src={`data:image/png;base64, ${avatar}`} alt="avatar" />}
          {!avatar && username?.charAt(0)?.toUpperCase()}
        </div>
      </div>
      <dl className={styles.listField}>
        <dt className={styles.fieldLabel}>Username:</dt>
        <dd>{username}</dd>
        <dt className={styles.fieldLabel}>Join date:</dt>
        <dd>{moment(joinDate).format('LLLL')}</dd>
        <dt className={styles.fieldLabel}>Email:</dt>
        <dd>{email}</dd>
        <dt className={styles.fieldLabel}>Status:</dt>
        <dd>{status}</dd>
        <dt className={styles.fieldLabel}>Total Notes:</dt>
        <dd>{totalNotes}</dd>
      </dl>
      <div className={styles.dangrousZone}>
        <p className={styles.fieldLabel}>Delete {userId ? 'this' : 'your'} account</p>
        <p>
          it is possible to
          <button className={styles.deleteAccount} onClick={() => setIsShowConfirm(true)}>
            delete {userId ? 'this' : 'your'} account
          </button>
          , but it is irreversible. Please be sure that you would like to do that.
        </p>
      </div>
      {isShowConfirm && (
        <ConfirmModal
          title="Warning !!!"
          message={`Are you sure to Delete ${userId ? 'this' : 'your'} account?`}
          onClose={() => setIsShowConfirm(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
    </div>
  );
};

export default MyProfile;
