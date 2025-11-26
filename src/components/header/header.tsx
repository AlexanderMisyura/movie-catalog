import { UrlPath } from '@ts-enums';
import { NavLink } from 'react-router';

import logoIcon from '@/assets/icons/Logo.svg';
import userIcon from '@/assets/icons/User.svg';

import styles from './header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={`wrapper ${styles.header}`}>
      <NavLink to={UrlPath.HOME} className={styles.logo}>
        <img src={logoIcon} alt="mooz logo" />
      </NavLink>

      <input type="text" placeholder="Search..." defaultValue="Batman" />

      <div className={styles.user}>
        <img src={userIcon} alt="user icon" />
        Your Name
      </div>
    </header>
  );
};
