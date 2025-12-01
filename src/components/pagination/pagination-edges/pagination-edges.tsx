import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router';

import leftIcon from '@/assets/icons/arrow-left.svg';
import leftIconActive from '@/assets/icons/arrow-left-active.svg';
import rightIcon from '@/assets/icons/arrow-right.svg';
import rightIconActive from '@/assets/icons/arrow-right-active.svg';

import styles from './pagination-edges.module.css';

interface PaginationEdges {
  previousPage: number;
  nextPage: number;
  pages: (number | '...')[];
  searchTerm: string;
}

export const PaginationEdges: React.FC<PropsWithChildren<PaginationEdges>> = ({
  children,
  previousPage,
  nextPage,
  pages,
  searchTerm,
}) => {
  return (
    <>
      <div className={styles.paginationEdge}>
        {previousPage >= 1 ? (
          <NavLink to={`?s=${searchTerm}&page=${previousPage}`}>
            <img src={leftIconActive} alt="left" />
          </NavLink>
        ) : (
          <img src={leftIcon} alt="left" />
        )}
      </div>
      {children}
      <div className={styles.paginationEdge}>
        {nextPage <= pages.length ? (
          <NavLink to={`?s=${searchTerm}&page=${nextPage}`}>
            <img src={rightIconActive} alt="right" />
          </NavLink>
        ) : (
          <img src={rightIcon} alt="right" />
        )}
      </div>
    </>
  );
};
