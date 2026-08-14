const CustomerForm = ({ customer, onChange, onSave, onReset }) => {
  return (
    <div className="rounded-xl lg:rounded-2xl bg-white p-4 lg:p-5 shadow-sm">
      <h2 className="text-base lg:text-lg font-semibold text-slate-900">Customer Details</h2>
      <div className="mt-3 lg:mt-4 space-y-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Customer Name</span>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onChange({ ...customer, name: e.target.value })}
            className="mt-1 w-full rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:py-2.5 text-sm lg:text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            placeholder="Enter customer name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Phone</span>
          <input
            type="text"
            value={customer.phone}
            onChange={(e) => onChange({ ...customer, phone: e.target.value })}
            className="mt-1 w-full rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:py-2.5 text-sm lg:text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            placeholder="0123456789"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Notes</span>
          <input
            type="text"
            value={customer.note}
            onChange={(e) => onChange({ ...customer, note: e.target.value })}
            className="mt-1 w-full rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:py-2.5 text-sm lg:text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
            placeholder="Optional note or label"
          />
        </label>
      </div>
      <div className="mt-4 lg:mt-5 flex gap-2 lg:gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-lg lg:rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:bg-slate-100"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onSave}
          className="flex-1 rounded-lg lg:rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800"
        >
          {customer.id ? 'Update' : 'Add Customer'}
        </button>
      </div>
    </div>
  )
}

export default CustomerForm
