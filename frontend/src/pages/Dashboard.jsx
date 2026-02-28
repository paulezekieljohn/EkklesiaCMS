import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { Card } from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { getDashboardData } from '../services/api'

const pieColors = ['#1E3A8A', '#14B8A6', '#16A34A', '#F59E0B']

export default function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getDashboardData().then(setData)
  }, [])

  if (!data) {
    return <p className="text-slate-500">Loading dashboard...</p>
  }

  return (
    <div>
      <PageHeader title="Dashboard" description="A quick overview of membership and church finances." />

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.kpis.map((kpi) => (
          <Card key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
          <h3 className="font-semibold mb-3">Monthly Collection</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.collection}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#1E3A8A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
          <h3 className="font-semibold mb-3">Offering Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.offeringBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85}>
                  {data.offeringBreakdown.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-soft p-5">
          <h3 className="font-semibold mb-3">Growth Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.collection}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#14B8A6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft p-5 space-y-4">
          <h3 className="font-semibold">Alerts</h3>
          <AlertList title="🎂 Birthdays This Week" items={data.alerts.birthdays} />
          <AlertList title="💍 Anniversaries" items={data.alerts.anniversaries} />
          <AlertList title="⚠ Pending Payments" items={data.alerts.pendingPayments} />
        </div>
      </section>
    </div>
  )
}

function AlertList({ title, items }) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">{title}</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
