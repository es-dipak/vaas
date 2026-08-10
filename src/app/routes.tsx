import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';

// Error pages
import { NotFoundPage } from '@/components/common/NotFoundPage';
import { ErrorPage } from '@/components/common/ErrorPage';

// Auth pages
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';

// App pages
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { AssetsPage } from '@/features/assets/pages/AssetsPage';
import { ScansPage } from '@/features/scans/pages/ScansPage';
import { FindingsPage } from '@/features/findings/pages/FindingsPage';
import { ReportsPage } from '@/features/reports/pages/ReportsPage';
import { RemediationPage } from '@/features/remediation/pages/RemediationPage';
import { MonitoringPage } from '@/features/monitoring/pages/MonitoringPage';
import { ClientsPage } from '@/features/clients/pages/ClientsPage';
import { IntegrationsPage } from '@/features/integrations/pages/IntegrationsPage';
import { SettingsPage } from '@/features/settings/pages/SettingsPage';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [{ index: true, element: <Navigate to="/auth/login" replace /> }],
  },

  // Auth routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
    ],
  },

  // App routes
  {
    path: '/app',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: 'dashboard',    element: <DashboardPage /> },
      { path: 'assets',       element: <AssetsPage /> },
      { path: 'scans',        element: <ScansPage /> },
      { path: 'findings',     element: <FindingsPage /> },
      { path: 'reports',      element: <ReportsPage /> },
      { path: 'remediation',  element: <RemediationPage /> },
      { path: 'monitoring',   element: <MonitoringPage /> },
      { path: 'clients',      element: <ClientsPage /> },
      { path: 'integrations', element: <IntegrationsPage /> },
      { path: 'settings',     element: <SettingsPage /> },
    ],
  },

  // Error routes
  { path: '/404', element: <NotFoundPage /> },
  { path: '/error', element: <ErrorPage /> },
  { path: '*', element: <Navigate to="/404" replace /> },
]);
