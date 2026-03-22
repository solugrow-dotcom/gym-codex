import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AttendancePage } from '../pages/AttendancePage';
import { DashboardPage } from '../pages/DashboardPage';
import { MembersPage } from '../pages/MembersPage';
import { PaymentsPage } from '../pages/PaymentsPage';
import { PreviewGalleryPage } from '../pages/PreviewGalleryPage';
import { ReportsPage } from '../pages/ReportsPage';
import { SaasAdminPage } from '../pages/SaasAdminPage';
import { TrainersPage } from '../pages/TrainersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'members', element: <MembersPage /> },
      { path: 'attendance', element: <AttendancePage /> },
      { path: 'payments', element: <PaymentsPage /> },
      { path: 'trainers', element: <TrainersPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'saas-admin', element: <SaasAdminPage /> },
      { path: 'preview-gallery', element: <PreviewGalleryPage /> }
    ]
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;
