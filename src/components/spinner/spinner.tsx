import spinnerIcon from '@/assets/icons/spinner.svg';

import styles from './spinner.module.css';

export const Spinner: React.FC = () => {
  return (
    <div>
      <img className={styles.spinner} src={spinnerIcon} alt="spinner" />
    </div>
  );
};
