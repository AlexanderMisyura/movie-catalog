import { Header } from '@components';
import { Outlet } from 'react-router';

import { TEMP_USER } from './constants';

export const RootLayout: React.FC = () => {
  return (
    <>
      <Header user={TEMP_USER} />

      <main className="wrapper">
        <Outlet />
      </main>
    </>
  );
};
