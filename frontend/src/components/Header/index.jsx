import React from 'react';
import logo from '../../assets/images/logo.jpg';
import Search from './Search';
import AvatarDropdown from './AvatarDropdown';
import classes from './Header.module.scss';

function Header({ title }) {
  return (
    <div className="header-nav">
      <div className="logo-name">
        <img src={logo} alt="logo" className="logo" />
        <p>{title}</p>
      </div>
      <div className={classes['header-right']}>
        <Search text="search here..." cname="btn btn-color search" />
        <AvatarDropdown />
      </div>
    </div>
  );
}
export default Header;
