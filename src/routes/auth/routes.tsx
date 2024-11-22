import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from '../../guards';
import { paths } from '../paths';
import { Layout as AuthLayout } from '../../components/layouts/auth';

const LoginPage = lazy(() => import('../../pages/auth/login/index'));
const RegisterPage = lazy(() => import('../../pages/auth/registration/index'));
const RegisterSuccessPage = lazy(() => import('../../pages/auth/registration/RegistrarionSuccessPage'));
const ForgotPasswordPage = lazy(() => import('../../pages/auth/forgot-password/index'));
const ActivateUserPage = lazy(() => import('../../pages/auth/activate/index'));

export const authRoutes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        element: (
          <GuestGuard>
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          </GuestGuard>
        ),
        children: [
          {
            path: paths.auth.login,
            element: <LoginPage />,
          },
          {
            path: paths.auth.register.index,
            element: <RegisterPage />,
          },
          {
            path: paths.auth.register.success,
            element: <RegisterSuccessPage />,
          },
          {
            path: paths.auth.resetPwd,
            element: <ForgotPasswordPage />,
          },
          {
            path: `${paths.auth.activateUser}/:activationToken`,
            element: <ActivateUserPage />,
          }
        ],
      },
    ],
  },
];
