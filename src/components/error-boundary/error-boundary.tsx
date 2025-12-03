import { UrlPath } from '@ts-enums';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

import styles from './error-boundary.module.css';

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  let message = '404';

  if (error) {
    if (isRouteErrorResponse(error)) {
      message = `${error.status} ${error.statusText}`;
    } else {
      message = error instanceof Error ? error.message : 'Unknown Error';
    }
  }

  return (
    <div data-testid="error-display" className={styles.error}>
      <p className={styles.message}>{message}</p>
      <Link to={UrlPath.CATALOG} className={styles.link}>
        To Catalog page
      </Link>
    </div>
  );
};
