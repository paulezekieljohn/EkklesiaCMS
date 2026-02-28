import { Bell, ChevronDown, Menu } from 'lucide-react'

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-slate-100" aria-label="Toggle menu">
          <Menu size={18} />
        </button>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">Church</p>
          <h1 className="text-sm md:text-base font-semibold text-brand-primary">Grace Fellowship, Chennai</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-slate-100">
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-brand-danger rounded-full" />
        </button>
        <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-slate-100">
          <div className="h-8 w-8 rounded-full bg-brand-accent text-white grid place-items-center text-sm font-semibold">PA</div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium leading-tight">Pastor Abraham</p>
            <p className="text-xs text-slate-500">Tenant Admin</p>
          </div>
          <ChevronDown size={16} className="text-slate-500" />
        </button>
      </div>
    </header>
  )
}
