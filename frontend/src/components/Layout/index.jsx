import React from 'react';
import { TfiBackLeft } from 'react-icons/tfi';
import { NavLink, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import AppContext from '../../store/context';
import styles from './Layout.module.scss';

const TABS = [
  { id: 0, name: 'My Profile', path: '/my-profile', isPrivate: false },
  { id: 1, name: 'My Settings', path: '/my-setting', isPrivate: false },
  { id: 2, name: 'User Management (Admin)', path: '/admin', isPrivate: true },
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
  const { auth } = React.useContext(AppContext);
  const isAdmin = auth?.userInfo?.roles === 'admin';

  return (
    <div className={styles.layout}>
      <div className={styles.layoutHeader}>
        <button onClick={() => navigate('/')}>
          <TfiBackLeft />
          Home
        </button>
      </div>
      <div className={styles.layoutContent}>
        <ul className={styles.sidebar}>
          {TABS.filter((item) => !item.isPrivate || (item.isPrivate && isAdmin)).map((tab) => (
            <SideBarItem key={tab.id} item={tab} />
          ))}
        </ul>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
