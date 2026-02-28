import PageHeader from '../components/ui/PageHeader'

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" description="Configure church profile, roles, and preferences." />
      <div className="bg-white border border-slate-100 rounded-2xl shadow-soft p-5 grid sm:grid-cols-2 gap-3">
        <input className="px-3 py-2 border border-slate-200 rounded-lg" placeholder="Church name" />
        <input className="px-3 py-2 border border-slate-200 rounded-lg" placeholder="City" />
        <input className="px-3 py-2 border border-slate-200 rounded-lg" placeholder="Contact email" />
        <input className="px-3 py-2 border border-slate-200 rounded-lg" placeholder="Timezone" />
      </div>
    </div>
  )
}
