/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';

import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

const Error401Page = lazy(() => import('../pages/401'));
const Error404Page = lazy(() => import('../pages/404'));

export const routes = [ 
  ...authRoutes,
  ...dashboardRoutes, 
  {
    path: '401',
    element: <Error401Page />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];