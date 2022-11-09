import React, { useContext, useRef, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiEditAlt, BiUser } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdForwardToInbox } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import appApi from '../../../services/appApi';
import AppContext from '../../../store/context';
import classes from './Profile.module.scss';

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowDropdown(false));
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await appApi.logout();
      logout();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.profile} ref={ref}>
      <div className={classes.avatar} onClick={() => setShowDropdown((prev) => !prev)}>
        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="avatar" className="avatarbtn" />
      </div>
      {showDropdown && (
        <div className={classes.info}>
          <h3 className={classes.name}>
            <h3>Nguyen Van A</h3>
            <span className={classes.desc}>dadadad adadada adadada</span>
          </h3>
          <ul className={classes['info-menu']}>
            <li>
              <BiUser />
              <a href="#">My Profile</a>
            </li>
            <li>
              <BiEditAlt />
              <a href="#">Edit Profile</a>
            </li>
            <li>
              <MdForwardToInbox />
              <a href="#">Inbox</a>
            </li>
            <li>
              <IoSettingsOutline />
              <a href="#">Settings</a>
            </li>
            <li>
              <FiHelpCircle />
              <a href="#">Help</a>
            </li>
            <li>
              <AiOutlineLogout />
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
