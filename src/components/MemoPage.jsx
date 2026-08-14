import { useMemo, useState } from 'react'
import { formatCurrency } from '../utils/currency'

const MemoPage = ({
  store,
  selectedCustomer,
  memoDate,
  onMemoDateChange,
  previousDue,
  onPreviousDueChange,
  onDownloadPdf,
  onPrint,
  onSaveMemo,
  items,
  payments,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onAddPayment,
  onUpdatePayment,
  onDeletePayment,
  totals,
  customers,
  onSelectCustomer,
  memoHistory = [],
}) => {
  const [filter, setFilter] = useState('')
  const [showHistory, setShowHistory] = useState(false)

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) =>
        `${customer.name} ${customer.phone}`
          .toLowerCase()
          .includes(filter.toLowerCase())
      ),
    [customers, filter]
  )

  return (
    <div className="grid gap-4 lg:gap-6 lg:grid-cols-[280px_1fr]">
      {/* Left Sidebar - Customer List Only */}
      <aside className="rounded-2xl bg-white p-4 lg:p-5 shadow-sm space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base lg:text-lg font-semibold text-slate-900">Customers</h2>
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              {showHistory ? 'Customers' : `History (${memoHistory.length})`}
            </button>
          </div>
          
          {!showHistory ? (
            <>
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                placeholder="Search..."
              />
              <div className="mt-4 space-y-2 max-h-[300px] lg:max-h-[calc(100vh-280px)] overflow-y-auto">
                {filteredCustomers.length === 0 ? (
                  <p className="text-sm text-slate-500 py-4 text-center">No customers</p>
                ) : (
                  filteredCustomers.map((customer) => {
                    const isSelected = customer.id === selectedCustomer?.id
                    return (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => onSelectCustomer(customer.id)}
                        className={`w-full text-left rounded-xl px-3 py-3 transition ${
                          isSelected
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-slate-50 border border-transparent hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-sm font-semibold text-slate-900">{customer.name}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{customer.phone}</p>
                      </button>
                    )
                  })
                )}
              </div>
            </>
          ) : (
            <div className="mt-4 space-y-2 max-h-[300px] lg:max-h-[calc(100vh-280px)] overflow-y-auto">
              {memoHistory.length === 0 ? (
                <p className="text-sm text-slate-500 py-4 text-center">No memos saved yet</p>
              ) : (
                memoHistory.map((memo) => (
                  <div key={memo.id} className="bg-slate-50 rounded-xl px-3 py-3 border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">{memo.customerName}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{memo.memoDate}</p>
                    <div className="mt-2 text-xs text-slate-600">
                      <p>Items: {formatCurrency(memo.totals.itemsTotal)}</p>
                      <p>Paid: {formatCurrency(memo.totals.totalPaid)}</p>
                      <p className={memo.totals.remainingBalance > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        Due: {formatCurrency(memo.totals.remainingBalance)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Memo Area */}
      <main className="rounded-2xl bg-white p-4 lg:p-6 shadow-sm space-y-4 lg:space-y-6">
        {/* Store Info & Customer Info - Side by Side */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 border-b border-slate-200 pb-4">
          {/* Store Info - Left */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Store Owner</h3>
            <p className="text-base lg:text-lg font-semibold text-slate-900 mt-1">{store.name || 'Store name not set'}</p>
            <p className="text-xs lg:text-sm text-slate-600">{store.phone || 'Phone missing'}</p>
            <p className="text-xs lg:text-sm text-slate-600">{store.address || 'Address missing'}</p>
          </div>

          {/* Customer Info & Date - Right */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</h3>
            {selectedCustomer ? (
              <>
                <p className="text-base lg:text-lg font-semibold text-slate-900 mt-1">{selectedCustomer.name}</p>
                <p className="text-xs lg:text-sm text-slate-600">{selectedCustomer.phone}</p>
              </>
            ) : (
              <p className="text-xs lg:text-sm text-slate-500 mt-1">No customer selected</p>
            )}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</label>
                <input
                  type="date"
                  value={memoDate}
                  onChange={(e) => onMemoDateChange(e.target.value)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Previous Due</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={previousDue ?? ''}
                  onChange={(e) => onPreviousDueChange(e.target.value ? Number(e.target.value) : 0)}
                  className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Items Given & Payments */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {/* Left: Items Given */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm lg:text-base font-semibold text-slate-900">Items Given</h3>
              <button
                type="button"
                onClick={onAddItem}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2 max-h-[300px] lg:max-h-[400px] overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-sm text-slate-500 py-4 text-center">No items</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="bg-slate-50 rounded-lg p-2.5 lg:p-3 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => onUpdateItem(item.id, { ...item, name: e.target.value })}
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                        placeholder="Item name*"
                        required
                      />
                      <input
                        type="date"
                        value={item.date || ''}
                        onChange={(e) => onUpdateItem(item.id, { ...item, date: e.target.value })}
                        className="w-28 lg:w-32 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs lg:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      />
                      <button
                        type="button"
                        onClick={() => onDeleteItem(item.id)}
                        className="rounded-lg bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-100 active:bg-red-200"
                      >
                        ×
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 lg:gap-2">
                      <div>
                        <label className="text-[10px] lg:text-xs text-slate-500">Qty*</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.quantity ?? ''}
                          onChange={(e) => onUpdateItem(item.id, { ...item, quantity: e.target.value ? Number(e.target.value) : '' })}
                          className="w-full rounded-lg border border-slate-200 bg-white px-1.5 lg:px-2 py-1.5 text-xs lg:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                          placeholder="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] lg:text-xs text-slate-500">Unit Price*</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice ?? ''}
                          onChange={(e) => onUpdateItem(item.id, { ...item, unitPrice: e.target.value ? Number(e.target.value) : '' })}
                          className="w-full rounded-lg border border-slate-200 bg-white px-1.5 lg:px-2 py-1.5 text-xs lg:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                          placeholder="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] lg:text-xs text-slate-500">Amount*</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.amount ?? ''}
                          onChange={(e) => onUpdateItem(item.id, { ...item, amount: e.target.value ? Number(e.target.value) : '', quantity: '', unitPrice: '' })}
                          className="w-full rounded-lg border border-slate-200 bg-white px-1.5 lg:px-2 py-1.5 text-xs lg:text-sm text-right font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                          placeholder="0"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs lg:text-sm font-semibold text-slate-700">Total Given:</span>
              <span className="text-sm lg:text-base font-bold text-slate-900">{formatCurrency(totals.itemsTotal)}</span>
            </div>
          </div>

          {/* Right: Payments */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm lg:text-base font-semibold text-slate-900">Payments Received</h3>
              <button
                type="button"
                onClick={onAddPayment}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 active:bg-green-800"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2 max-h-[300px] lg:max-h-[400px] overflow-y-auto">
              {payments.length === 0 ? (
                <p className="text-sm text-slate-500 py-4 text-center">No payments</p>
              ) : (
                payments.map((payment) => (
                  <div key={payment.id} className="bg-slate-50 rounded-lg p-2.5 lg:p-3 space-y-2">
                    <input
                      type="text"
                      value={payment.description}
                      onChange={(e) => onUpdatePayment(payment.id, { ...payment, description: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      placeholder="Payment description"
                    />
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={payment.date || ''}
                        onChange={(e) => onUpdatePayment(payment.id, { ...payment, date: e.target.value })}
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-2 lg:px-3 py-1.5 text-xs lg:text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={payment.amount ?? ''}
                        onChange={(e) => onUpdatePayment(payment.id, { ...payment, amount: e.target.value ? Number(e.target.value) : '' })}
                        className="w-20 lg:w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs lg:text-sm text-right text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                        placeholder="0"
                      />
                      <button
                        type="button"
                        onClick={() => onDeletePayment(payment.id)}
                        className="rounded-lg bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-100 active:bg-red-200"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs lg:text-sm font-semibold text-slate-700">Total Paid:</span>
              <span className="text-sm lg:text-base font-bold text-green-600">{formatCurrency(totals.totalPaid)}</span>
            </div>
          </div>
        </div>

        {/* Overall Total & Actions */}
        <div className="border-t border-slate-200 pt-4 lg:pt-6">
          <div className="space-y-4">
            {/* Totals - Mobile Optimized Grid */}
            <div className="grid grid-cols-2 lg:flex lg:gap-8 gap-3">
              <div>
                <p className="text-[10px] lg:text-xs text-slate-500">Previous Due</p>
                <p className="text-sm lg:text-lg font-semibold text-orange-600">{formatCurrency(totals.previousDue || 0)}</p>
              </div>
              <div>
                <p className="text-[10px] lg:text-xs text-slate-500">Total Given</p>
                <p className="text-sm lg:text-lg font-semibold text-slate-900">{formatCurrency(totals.itemsTotal)}</p>
              </div>
              <div>
                <p className="text-[10px] lg:text-xs text-slate-500">Total Paid</p>
                <p className="text-sm lg:text-lg font-semibold text-green-600">{formatCurrency(totals.totalPaid)}</p>
              </div>
              <div>
                <p className="text-[10px] lg:text-xs text-slate-500">Balance Due</p>
                <p className={`text-sm lg:text-lg font-bold ${totals.remainingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(totals.remainingBalance)}
                </p>
              </div>
            </div>
            
            {/* Action Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
              <button
                type="button"
                onClick={onSaveMemo}
                className="flex-1 sm:flex-none rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 active:bg-green-800"
              >
                Save Memo
              </button>
              <button
                type="button"
                onClick={onPrint}
                className="flex-1 sm:flex-none rounded-lg bg-slate-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 active:bg-slate-800"
              >
                Print
              </button>
              <button
                type="button"
                onClick={onDownloadPdf}
                className="flex-1 sm:flex-none rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MemoPage
