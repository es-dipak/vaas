import { Link } from 'react-router-dom';
import { ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline';

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorPage({ message, onRetry }: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">&#9888;&#65039;</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Something went wrong
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          {message ?? 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Try again
            </button>
          )}
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            <HomeIcon className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
