import { useState } from 'react'

const StoreSettings = ({ store, onChange }) => {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto rounded-xl lg:rounded-2xl bg-white p-4 lg:p-6 shadow-sm">
      <h2 className="text-lg lg:text-xl font-semibold text-slate-900">Store Information</h2>
      <div className="mt-4 lg:mt-5 space-y-3 lg:space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Store Name</span>
          <input
            type="text"
            value={store.name}
            onChange={(e) => onChange({ ...store, name: e.target.value })}
            className="mt-1 w-full rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50 px-3 lg:px-4 py-2 lg:py-2.5 text-sm lg:text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            placeholder="My Store"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Phone</span>
          <input
            type="text"
            value={store.phone}
            onChange={(e) => onChange({ ...store, phone: e.target.value })}
            className="mt-1 w-full rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50 px-3 lg:px-4 py-2 lg:py-2.5 text-sm lg:text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            placeholder="0123456789"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Address</span>
          <input
            type="text"
            value={store.address}
            onChange={(e) => onChange({ ...store, address: e.target.value })}
            className="mt-1 w-full rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50 px-3 lg:px-4 py-2 lg:py-2.5 text-sm lg:text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            placeholder="123 Main Street"
          />
        </label>
        <button
          type="button"
          onClick={handleSave}
          className="w-full rounded-lg lg:rounded-xl bg-blue-600 px-4 py-2.5 lg:py-3 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition"
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default StoreSettings
