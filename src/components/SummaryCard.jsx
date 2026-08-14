import { formatCurrency } from '../utils/currency'

const SummaryCard = ({ totals }) => {
  return (
    <div className="sticky bottom-0 z-10 rounded-3xl bg-white p-6 shadow-soft shadow-slate-200/80">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Items Total</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{formatCurrency(totals.itemsTotal)}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Total Paid</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{formatCurrency(totals.totalPaid)}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Remaining Balance</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{formatCurrency(totals.remainingBalance)}</p>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
