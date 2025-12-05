import { UrlPath } from '@ts-enums';
import type { User } from '@ts-interfaces';
import { type ChangeEvent, useEffect, useRef } from 'react';
import { NavLink, useSearchParams } from 'react-router';

import logoIcon from '@/assets/icons/Logo.svg';
import userIcon from '@/assets/icons/User.svg';
import { changeEventDebounceWrapper } from '@/utils/debounce';

import styles from './header.module.css';

export const Header: React.FC<{ user: User }> = ({ user }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = searchParams.get('s')?.trim() ?? '';
  }, [searchParams]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim();

    if (!searchTerm) {
      setSearchParams({});
    } else {
      setSearchParams({ s: searchTerm });
    }
  };

  return (
    <header data-testid="header" className={`wrapper ${styles.header}`}>
      <NavLink to={UrlPath.HOME} className={styles.logo}>
        <img src={logoIcon} alt="mooz logo" />
      </NavLink>

      <input
        onChange={changeEventDebounceWrapper(handleInput)}
        ref={inputRef}
        className={styles.search}
        type="search"
        name="s"
        placeholder="Search..."
        defaultValue={searchParams.get('s')?.trim() ?? ''}
      />

      <div className={styles.user}>
        <img src={userIcon} alt="user icon" />
        {user.name}
      </div>
    </header>
  );
};
