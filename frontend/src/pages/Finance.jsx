import PageHeader from '../components/ui/PageHeader'

export default function Finance() {
  return (
    <div>
      <PageHeader title="Finance" description="Subscriptions, offerings, and expenses in one guided workflow." />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-soft p-5">
          <h3 className="font-semibold mb-4">Subscription Entry</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input className="px-3 py-2 border border-slate-200 rounded-lg" placeholder="Select member" />
            <input className="px-3 py-2 border border-slate-200 rounded-lg" placeholder="Number of months" />
            <select className="px-3 py-2 border border-slate-200 rounded-lg">
              <option>Payment mode</option>
              <option>UPI</option>
              <option>Cash</option>
              <option>Bank Transfer</option>
            </select>
            <input className="px-3 py-2 border border-slate-200 rounded-lg" placeholder="Auto calculated total" disabled />
          </div>
          <button className="mt-4 px-4 py-2 rounded-lg bg-brand-primary text-white">Submit Payment</button>
        </div>
        <aside className="bg-white border border-slate-100 rounded-2xl shadow-soft p-5">
          <h3 className="font-semibold mb-2">Guided Summary</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>Pending months: <strong>3</strong></li>
            <li>Monthly amount: <strong>₹500</strong></li>
            <li>Suggested payment: <strong>₹1,500</strong></li>
            <li>Last payment: <strong>12 Feb 2026</strong></li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
