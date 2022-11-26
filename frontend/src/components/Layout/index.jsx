import React from 'react';
import { TfiBackLeft } from 'react-icons/tfi';
import { NavLink, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import styles from './Layout.module.scss';

const TABS = [
  { id: 0, name: 'My Profile', path: '/my-profile' },
  { id: 1, name: 'My Settings', path: '/my-setting' },
];

const SideBarItem = ({ item }) => {
  const resolved = useResolvedPath(item.path);
  const match = useMatch({ path: resolved.pathname, end: false });
  return (
    <li key={item.id} className={match ? styles.active : ''}>
      <NavLink to={item.path}>{item.name}</NavLink>
    </li>
  );
};

const Layout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.layout}>
      <div className={styles.layoutHeader}>
        <button onClick={() => navigate('/')}>
          <TfiBackLeft />
          Back
        </button>
      </div>
      <div className={styles.layoutContent}>
        <ul className={styles.sidebar}>
          {TABS.map((tab) => (
            <SideBarItem key={tab.id} item={tab} />
          ))}
        </ul>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
