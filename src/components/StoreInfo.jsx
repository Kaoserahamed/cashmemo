import { formatCurrency } from '../utils/currency'

const StoreInfo = ({ store, onChange }) => {
  return (
    <div className="space-y-4 rounded-3xl bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-slate-900">Store Information</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Store Name</span>
          <input
            type="text"
            value={store.name}
            onChange={(e) => onChange({ ...store, name: e.target.value })}
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Phone</span>
          <input
            type="text"
            value={store.phone}
            onChange={(e) => onChange({ ...store, phone: e.target.value })}
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="block sm:col-span-3">
          <span className="text-sm font-medium text-slate-700">Address</span>
          <input
            type="text"
            value={store.address}
            onChange={(e) => onChange({ ...store, address: e.target.value })}
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </div>
    </div>
  )
}

export default StoreInfo
