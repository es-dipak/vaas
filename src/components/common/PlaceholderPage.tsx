import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="page-container">
      <div className="flex flex-col items-center justify-center min-h-96 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <WrenchScrewdriverIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          {description ?? 'This feature is under development and will be available soon.'}
        </p>
      </div>
    </div>
  );
}
