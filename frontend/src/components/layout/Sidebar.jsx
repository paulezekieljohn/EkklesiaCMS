import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  House,
  Landmark,
  FileBadge,
  BarChart3,
  Settings,
  Church,
  Menu
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/families', label: 'Families', icon: House },
  { to: '/finance', label: 'Finance', icon: Landmark },
  { to: '/certificates', label: 'Certificates', icon: FileBadge },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export default function Sidebar({ open, onToggle }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-brand-primary text-white grid place-items-center shadow-soft">
            <Church size={18} />
          </div>
          <div>
            <p className="font-semibold">Ekklesia CMS</p>
            <p className="text-xs text-slate-500">Church Operations</p>
          </div>
        </div>
        <button onClick={onToggle} className="lg:hidden p-2 rounded-md hover:bg-slate-100" aria-label="Close menu">
          <Menu size={18} />
        </button>
      </div>

      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onToggle}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive ? 'bg-blue-50 text-brand-primary font-medium' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
