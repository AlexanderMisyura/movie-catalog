import { UrlPath } from '@ts-enums';
import type { User } from '@ts-interfaces';
import { NavLink } from 'react-router';

import logoIcon from '@/assets/icons/Logo.svg';
import userIcon from '@/assets/icons/User.svg';
import { DEFAULT_SEARCH_QUERY } from '@/constants';

import styles from './header.module.css';

export const Header: React.FC<{ user: User }> = ({ user }) => {
  return (
    <header className={`wrapper ${styles.header}`}>
      <NavLink to={UrlPath.HOME} className={styles.logo}>
        <img src={logoIcon} alt="mooz logo" />
      </NavLink>

      <input
        className={styles.search}
        type="text"
        placeholder="Search..."
        defaultValue={DEFAULT_SEARCH_QUERY}
      />

      <div className={styles.user}>
        <img src={userIcon} alt="user icon" />
        {user.name}
      </div>
    </header>
  );
};
