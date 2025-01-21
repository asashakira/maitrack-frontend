import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {paths} from '@/config/paths';

import RegisterRoute from './routes/auth/register';
import LandingRoute from './routes/landing';
import NotFoundRoute from './routes/not-found';
import UserRoute from './routes/users';

// const convert = (m: any) => {
//   return {
//     Component: m.default,
//   };
// };
//
// export const createAppRouter = () =>
//   createBrowserRouter([
//     {
//       path: paths.home.path,
//       lazy: () => import('./routes/home').then(convert),
//     },
//     {
//       path: paths.auth.register.path,
//       lazy: () => import('./routes/auth/register').then(convert),
//     },
//     {
//       path: paths.users.path,
//       lazy: () => import('./routes/users').then(convert),
//     },
//     {
//       path: '*',
//       lazy: () => import('./routes/not-found').then(convert),
//     },
//   ]);
//
// export const AppRouter = () => {
//   const router = useMemo(() => createAppRouter(), []);
//   return <RouterProvider router={router} />;
// };

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home.path} element={<LandingRoute />} />
        <Route path={paths.auth.register.path} element={<RegisterRoute />} />
        <Route path={paths.users.path} element={<UserRoute />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  );
};
