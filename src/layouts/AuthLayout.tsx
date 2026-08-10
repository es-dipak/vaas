import { Outlet } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Logo inside card */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-3">
              <ShieldCheckIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">VaaS</h1>
            <p className="text-slate-500 text-xs mt-0.5">Vulnerability Assessment as a Service</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
