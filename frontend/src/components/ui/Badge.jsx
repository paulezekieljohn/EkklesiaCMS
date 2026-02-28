const variants = {
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
  neutral: 'bg-slate-100 text-slate-600'
}

export default function Badge({ children, variant = 'neutral' }) {
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>{children}</span>
}
