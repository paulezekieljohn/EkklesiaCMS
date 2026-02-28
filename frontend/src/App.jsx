import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Families from './pages/Families'
import Finance from './pages/Finance'
import Certificates from './pages/Certificates'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
      <div className="lg:pl-72 min-h-screen flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="p-4 md:p-6 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/families" element={<Families />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
