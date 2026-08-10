import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { findingsBySeverityData } from '../data/mockData';

const total = findingsBySeverityData.reduce((sum, d) => sum + d.value, 0);

export function FindingsBySeverityChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 mb-5">Findings by Severity</h3>
      <div className="flex items-center gap-8">
        {/* Donut */}
        <div className="relative flex-shrink-0 w-44 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={findingsBySeverityData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {findingsBySeverityData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [v, name]}
                contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-slate-900">{total}</span>
            <span className="text-xs text-slate-400">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {findingsBySeverityData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-slate-600">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-slate-800 w-8 text-right">{item.value}</span>
                <span className="text-slate-400 w-12 text-right">({item.pct}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
