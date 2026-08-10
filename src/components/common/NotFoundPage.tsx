import { Link } from 'react-router-dom';
import { HomeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <ExclamationCircleIcon className="w-10 h-10 text-slate-400" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/app/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          <HomeIcon className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
