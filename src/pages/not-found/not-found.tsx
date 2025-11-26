import { UrlPath } from '@ts-enums';
import { NavLink } from 'react-router';

export const NotFound = () => {
  return (
    <>
      <h1>404</h1>
      <NavLink to={UrlPath.CATALOG}>To Catalog</NavLink>
    </>
  );
};
