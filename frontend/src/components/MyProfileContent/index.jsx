import React, { useState, useEffect, useContext } from 'react';
import { TfiBackLeft } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import MySetting from '../MySetting';
import TextInput from '../UI/TextInput';
import styles from './MyProfileContent.module.scss';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AppContext from '../../store/context';

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [profileData, setProfileData] = useState();
  const { auth } = useContext(AppContext);

  useEffect(() => {
    const getProfile = async () => {
      if (auth?.userInfo?.userId) {
        try {
          const response = await axiosPrivate.get(`/users/${auth?.userInfo?.userId}`);
          setProfileData(response);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getProfile();
    // eslint-disable-next-line
  }, []);
  const handleDeleteAccount = () => {
    console.log('delete account');
  };

  return (
    <>
      <h2 className={styles.title}>My Profile</h2>
      <div className={styles.avatar}>
        <p className={styles.fieldLabel}>Avatar</p>
        <div className={styles.avatarImage}>
          {profileData?.avatar && <img src={profileData?.avatar} alt="avatar" />}
          {!profileData?.avatar && profileData?.username?.charAt(0)?.toUpperCase()}
        </div>
        {/* <img
          src={profileData?.avatar}
          alt="avatar"
        /> */}
      </div>
      <TextInput fieldName="Email" id="email" placeholder={profileData?.email} disabled />
      <TextInput fieldName="Username" id="username" placeholder={profileData?.username} disabled />
      <div className={styles.dangrousZone}>
        <p className={styles.fieldLabel}>Delete your account</p>
        <p>
          it is possible to
          <button className={styles.deleteAccount} onClick={handleDeleteAccount}>
            delete your account
          </button>
          , but it is irreversible. Please be sure that you would like to do that.
        </p>
      </div>
    </>
  );
};

const TABS = [
  { id: 0, name: 'My Profile', component: <Profile /> },
  { id: 1, name: 'My Settings', component: <MySetting /> },
];

const MyProfileContent = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();

  return (
    <div className={styles.myProfile}>
      <div className={styles.myProfileHeader}>
        <button onClick={() => navigate(-1)}>
          <TfiBackLeft />
          Back
        </button>
      </div>
      <div className={styles.myProfileContent}>
        <ul className={styles.verticalTabs}>
          {TABS.map((tab) => (
            <li key={tab.id} className={currentTab === tab.id ? styles.active : ''}>
              <button onClick={() => setCurrentTab(tab.id)} onKeyDown={() => setCurrentTab(tab.id)}>
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.content}>{TABS[currentTab].component}</div>
      </div>
    </div>
  );
};

export default MyProfileContent;
