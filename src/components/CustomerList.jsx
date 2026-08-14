import { useMemo, useState } from 'react'

const CustomerList = ({ customers, selectedCustomerId, onSelect, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('')

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) =>
        `${customer.name} ${customer.phone} ${customer.note}`
          .toLowerCase()
          .includes(filter.toLowerCase())
      ),
    [customers, filter]
  )

  return (
    <div className="rounded-xl lg:rounded-2xl bg-white p-4 lg:p-5 shadow-sm">
      <div className="flex flex-col gap-3">
        <h2 className="text-base lg:text-lg font-semibold text-slate-900">All Customers</h2>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg lg:rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 lg:py-2.5 text-sm lg:text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
          placeholder="Search customers"
        />
      </div>
      <div className="mt-4 space-y-2 max-h-[350px] lg:max-h-[420px] overflow-auto">
        {filteredCustomers.length === 0 ? (
          <div className="rounded-lg lg:rounded-xl border border-dashed border-slate-300 p-4 lg:p-5 text-sm text-slate-500 text-center">
            No customers found.
          </div>
        ) : (
          filteredCustomers.map((customer) => {
            const isSelected = customer.id === selectedCustomerId
            return (
              <div
                key={customer.id}
                className={`flex flex-col gap-2 rounded-lg lg:rounded-xl border px-3 py-2.5 lg:py-3 transition ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 lg:gap-3">
                  <button
                    type="button"
                    onClick={() => onSelect(customer.id)}
                    className="text-left text-sm font-semibold text-slate-900 flex-1 truncate"
                  >
                    {customer.name || 'Unnamed Customer'}
                  </button>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => onEdit(customer)}
                      className="rounded-lg border border-slate-200 bg-white px-2 lg:px-2.5 py-1 lg:py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 active:bg-slate-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(customer.id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-2 lg:px-2.5 py-1 lg:py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 active:bg-red-200"
                    >
                      Del
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-600">{customer.phone || 'No phone'}</p>
                {customer.note ? <p className="text-xs text-slate-500 line-clamp-1">{customer.note}</p> : null}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default CustomerList
