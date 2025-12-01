import { clsx } from 'clsx';
import { Link } from 'react-router';

import styles from './pagination-item.module.css';

interface PaginationItemProps {
  searchTerm: string;
  page: number | '...';
  isActive?: boolean;
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
  page,
  searchTerm,
  isActive,
}) => {
  if (page === '...') {
    return <span className={styles.paginationItem}>...</span>;
  }

  return (
    <Link
      to={`?s=${searchTerm}&page=${page}`}
      className={clsx(styles.paginationItem, { [styles.active]: isActive })}
    >
      {page}
    </Link>
  );
};
