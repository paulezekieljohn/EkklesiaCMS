import PageHeader from '../components/ui/PageHeader'

export default function Certificates() {
  return (
    <div>
      <PageHeader title="Certificates" description="Generate church certificates with preview before PDF export." />
      <div className="bg-white border border-slate-100 rounded-2xl shadow-soft p-5 max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="px-3 py-2 border border-slate-200 rounded-lg" placeholder="Select member" />
          <select className="px-3 py-2 border border-slate-200 rounded-lg">
            <option>Select certificate type</option>
            <option>Baptism</option>
            <option>Membership</option>
            <option>Marriage</option>
          </select>
          <input className="px-3 py-2 border border-slate-200 rounded-lg" type="date" />
        </div>
        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 rounded-lg border border-slate-200">Preview</button>
          <button className="px-4 py-2 rounded-lg bg-brand-primary text-white">Generate PDF</button>
        </div>
      </div>
    </div>
  )
}
