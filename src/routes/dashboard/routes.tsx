import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { AuthGuard } from "../../guards";
import { Layout as DashboardLayout } from '../../components/layouts/dashboard/index';

// eslint-disable-next-line react-refresh/only-export-components
const HomePage = lazy(() => import('../../pages/home'));

export const dashboardRoutes = [
    {
        path: '',
        element: (
            <AuthGuard>
                <Suspense>
                    <DashboardLayout>
                        <Outlet />
                    </DashboardLayout>
                </Suspense>
            </AuthGuard>
        ),
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
];