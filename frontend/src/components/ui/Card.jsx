export function Card({ title, value, subtitle, trend, trendColor = 'text-brand-success' }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-soft">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-slate-500">{subtitle}</p>
        <p className={`text-xs font-medium ${trendColor}`}>{trend}</p>
      </div>
    </div>
  )
}
