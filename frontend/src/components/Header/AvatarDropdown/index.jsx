import moment from 'moment';
import React, { useContext, useRef, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiAdminLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import appApi from '../../../services/appApi';
import AppContext from '../../../store/context';
import classes from './AvatarDropdown.module.scss';

function AvatarDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowDropdown(false));
  const { logout, setNoteList, auth } = useContext(AppContext);
  const navigate = useNavigate();
  const avatar = auth?.userInfo?.avatar;
  const username = auth?.userInfo?.username;
  const role = auth?.userInfo?.roles;
  const joinDate = auth?.userInfo?.joinDate;

  const handleLogout = async () => {
    try {
      await appApi.logout();
      logout();
      setNoteList([]);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.avatarDropdown} ref={ref}>
      <div
        role="button"
        tabIndex={0}
        className={classes.avatar}
        onClick={() => setShowDropdown((prev) => !prev)}
        onKeyDown={() => setShowDropdown((prev) => !prev)}
      >
        {avatar && <img src={avatar} alt="avatar" />}
        {!avatar && username?.charAt(0)?.toUpperCase()}
      </div>
      {showDropdown && (
        <div className={classes.dropdown}>
          <h3 className={classes.name}>
            {username}
            <p className={classes.joinDate}>join date: {moment(joinDate).format('DD/MM/YYYY')}</p>
          </h3>
          <ul className={classes['dropdown-menu']}>
            <li>
              <BiUser />
              <Link to="/my-profile">My Profile</Link>
            </li>
            {/* <li>
              <BiEditAlt />
              <Link to="/">Edit Profile</Link>
            </li> */}
            {role === 'admin' && (
              <li>
                <RiAdminLine />
                <Link to="/admin">Admin Page</Link>
              </li>
            )}
            <li>
              <IoSettingsOutline />
              <Link to="/my-setting">Settings</Link>
            </li>
            <li>
              <FiHelpCircle />
              <Link to="/">Help</Link>
            </li>
            <li>
              <AiOutlineLogout />
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
