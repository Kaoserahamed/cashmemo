import { parseAmount } from '../utils/currency'

const PaymentsTable = ({ payments, onAdd, onUpdate, onDelete, total }) => {
  return (
    <div className="space-y-4 rounded-3xl bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Customer Payments</h2>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Add Payment
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-700">
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={payment.description}
                    onChange={(e) => onUpdate(payment.id, { ...payment, description: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Description"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={payment.amount}
                    onChange={(e) => onUpdate(payment.id, { ...payment, amount: parseAmount(e.target.value) })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-right text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="0"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onDelete(payment.id)}
                    className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50">
              <td className="px-4 py-3 font-semibold text-slate-900">Total Paid</td>
              <td className="px-4 py-3 text-right font-semibold text-slate-900">৳{total.toLocaleString('en-IN')}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default PaymentsTable
