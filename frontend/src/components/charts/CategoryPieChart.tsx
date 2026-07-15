import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategoryBreakdownItem } from '../../types';

interface CategoryPieChartProps {
  data: CategoryBreakdownItem[];
}

const colors = ['#059669', '#D97706', '#0F172A', '#DC2626', '#64748b', '#1E293B', '#84cc16', '#f59e0b', '#334155', '#94a3b8'];

export const CategoryPieChart = ({ data }: CategoryPieChartProps): JSX.Element => {
  return (
    <div className="h-80 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">Category Breakdown</h3>
      <div className="mt-4 h-[calc(100%-2rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="total" nameKey="category" outerRadius={90} innerRadius={58} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={`${entry.category}-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};