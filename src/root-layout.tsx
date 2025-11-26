import { Header } from '@components';
import { Outlet } from 'react-router';

export const RootLayout: React.FC = () => {
  return (
    <>
      <Header />

      <main className="wrapper">
        <Outlet />
      </main>
    </>
  );
};
