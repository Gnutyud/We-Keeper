import React, { useContext, useRef, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiEditAlt, BiUser } from 'react-icons/bi';
import { FiHelpCircle } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdForwardToInbox } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import appApi from '../../../services/appApi';
import AppContext from '../../../store/context';
import classes from './Profile.module.scss';

function Profile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowDropdown(false));
  const { logout, setNoteList } = useContext(AppContext);
  const navigate = useNavigate();

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
    <div className={classes.profile} ref={ref}>
      <div
        role="button"
        tabIndex={0}
        className={classes.avatar}
        onClick={() => setShowDropdown((prev) => !prev)}
        onKeyDown={() => setShowDropdown((prev) => !prev)}
      >
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
              <Link to="/">My Profile</Link>
            </li>
            <li>
              <BiEditAlt />
              <Link to="/">Edit Profile</Link>
            </li>
            <li>
              <MdForwardToInbox />
              <Link to="/admin">Admin Page</Link>
            </li>
            <li>
              <IoSettingsOutline />
              <Link to="/">Settings</Link>
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

export default Profile;
