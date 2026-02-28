import { useEffect, useState } from 'react'
import { Search, Plus, Download } from 'lucide-react'
import Badge from '../components/ui/Badge'
import PageHeader from '../components/ui/PageHeader'
import { getMembers } from '../services/api'

export default function Members() {
  const [members, setMembers] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    getMembers().then(setMembers)
  }, [])

  const filtered = members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <PageHeader
        title="Members"
        description="Manage church members, status, and profile records."
        actions={
          <>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm hover:bg-slate-50">
              <Download size={16} /> Export
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-primary text-white text-sm hover:opacity-95">
              <Plus size={16} /> Add Member
            </button>
          </>
        }
      />

      <div className="bg-white border border-slate-100 rounded-2xl shadow-soft p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <label className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search members..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <select className="px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="py-3">Photo</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Family</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr key={member.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-brand-primary grid place-items-center font-semibold text-xs">
                      {member.name.split(' ').map((x) => x[0]).slice(0, 2).join('')}
                    </div>
                  </td>
                  <td className="font-medium">{member.name}</td>
                  <td>{member.phone}</td>
                  <td>{member.family}</td>
                  <td>
                    <Badge variant={member.status === 'Active' ? 'success' : 'warning'}>{member.status}</Badge>
                  </td>
                  <td className="space-x-2">
                    <button className="text-brand-primary hover:underline">View</button>
                    <button className="text-brand-accent hover:underline">Edit</button>
                    <button className="text-slate-600 hover:underline">Finance</button>
                    <button className="text-brand-danger hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
