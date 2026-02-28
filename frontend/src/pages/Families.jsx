import PageHeader from '../components/ui/PageHeader'

const families = [
  { name: 'Samuel Family', head: 'Mr. Samuel', members: 5, phone: '+91-98400-12101' },
  { name: 'Peter Family', head: 'Mr. Peter', members: 4, phone: '+91-98400-12102' }
]

export default function Families() {
  return (
    <div>
      <PageHeader title="Families" description="Track families and visualize relationship structure." />
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl shadow-soft p-5">
          <h3 className="font-semibold mb-3">Family List</h3>
          <div className="space-y-3">
            {families.map((family) => (
              <div key={family.name} className="rounded-xl border border-slate-200 p-4">
                <p className="font-medium">{family.name}</p>
                <p className="text-sm text-slate-500">Head: {family.head}</p>
                <p className="text-sm text-slate-500">Members: {family.members} · {family.phone}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-soft p-5">
          <h3 className="font-semibold mb-3">Family Tree View (Preview)</h3>
          <pre className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 leading-7">
Head of Family
├── Wife
├── Child 1
└── Child 2
          </pre>
        </div>
      </div>
    </div>
  )
}
