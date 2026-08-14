import { useEffect, useMemo, useState } from 'react'
import StoreSettings from './components/StoreSettings'
import CustomerManagement from './components/CustomerManagement'
import MemoPage from './components/MemoPage'
import { downloadCashMemoPdf } from './utils/pdf'
import { 
  loadCustomersFromFile,
  saveCustomersToFile,
  loadStoreFromFile,
  saveStoreToFile,
  loadMemosFromFile,
  saveMemoToFile,
  getCustomerMemos,
  exportAllData,
  importData
} from './utils/fileStorage'

const defaultState = {
  store: {
    name: 'My Store',
    phone: '',
    address: '',
  },
  customers: [],
  selectedCustomerId: null,
  memoDate: new Date().toISOString().slice(0, 10),
  previousDue: 0,
  items: [],
  payments: [],
}

const safeNumber = (value) => {
  const number = Number(value)
  return Number.isFinite(number) && number >= 0 ? number : 0
}

const initialCustomerForm = {
  id: '',
  name: '',
  phone: '',
  note: '',
}

const App = () => {
  const [page, setPage] = useState('memo')
  const [store, setStore] = useState(defaultState.store)
  const [customers, setCustomers] = useState(defaultState.customers)
  const [selectedCustomerId, setSelectedCustomerId] = useState(defaultState.selectedCustomerId)
  const [memoDate, setMemoDate] = useState(defaultState.memoDate)
  const [previousDue, setPreviousDue] = useState(defaultState.previousDue)
  const [items, setItems] = useState(defaultState.items)
  const [payments, setPayments] = useState(defaultState.payments)
  const [customerForm, setCustomerForm] = useState(initialCustomerForm)
  const [memoHistory, setMemoHistory] = useState([])

  // Load initial data from localStorage on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const [loadedStore, loadedCustomers, loadedMemos] = await Promise.all([
        loadStoreFromFile(),
        loadCustomersFromFile(),
        loadMemosFromFile()
      ])
      
      if (loadedStore) setStore(loadedStore)
      if (loadedCustomers.length > 0) setCustomers(loadedCustomers)
      if (loadedMemos.length > 0) setMemoHistory(loadedMemos)
    }
    
    loadInitialData()
  }, [])

  // Auto-save customers when changed
  useEffect(() => {
    if (customers.length > 0) {
      saveCustomersToFile(customers)
    }
  }, [customers])

  // Auto-save store when changed
  useEffect(() => {
    if (store.name) {
      saveStoreToFile(store)
    }
  }, [store])

  const selectedCustomer = useMemo(
    () => customers.find((customer) => customer.id === selectedCustomerId) ?? null,
    [customers, selectedCustomerId]
  )

  const itemsTotal = useMemo(
    () => items.reduce((sum, item) => sum + safeNumber(item.amount), 0),
    [items]
  )

  const totalPaid = useMemo(
    () => payments.reduce((sum, payment) => sum + safeNumber(payment.amount), 0),
    [payments]
  )

  const remainingBalance = itemsTotal + safeNumber(previousDue) - totalPaid

  const handleAddItem = () => {
    setItems((current) => [
      ...current,
      { id: crypto.randomUUID(), name: '', date: '', quantity: '', unitPrice: '', amount: '' },
    ])
  }

  const handleUpdateItem = (id, updated) => {
    // Auto-calculate amount if quantity or unitPrice changed
    if ('quantity' in updated || 'unitPrice' in updated) {
      const quantity = safeNumber(updated.quantity)
      const unitPrice = safeNumber(updated.unitPrice)
      if (quantity > 0 && unitPrice > 0) {
        updated.amount = quantity * unitPrice
      }
    }
    setItems((current) => current.map((item) => (item.id === id ? updated : item)))
  }

  const handleDeleteItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const handleAddPayment = () => {
    setPayments((current) => [
      ...current,
      { id: crypto.randomUUID(), description: '', date: '', amount: '' },
    ])
  }

  const handleUpdatePayment = (id, updated) => {
    setPayments((current) => current.map((payment) => (payment.id === id ? updated : payment)))
  }

  const handleDeletePayment = (id) => {
    setPayments((current) => current.filter((payment) => payment.id !== id))
  }

  const handleSaveCustomer = () => {
    const trimmedName = customerForm.name.trim()
    if (!trimmedName) {
      window.alert('Please enter a customer name before saving.')
      return
    }

    if (customerForm.id) {
      setCustomers((current) =>
        current.map((customer) =>
          customer.id === customerForm.id ? { ...customer, ...customerForm, name: trimmedName } : customer
        )
      )
    } else {
      setCustomers((current) => [
        ...current,
        { ...customerForm, id: crypto.randomUUID(), name: trimmedName },
      ])
    }

    setCustomerForm(initialCustomerForm)
    setPage('memo')
  }

  const handleEditCustomer = (customer) => {
    setCustomerForm(customer)
    setPage('customers')
  }

  const handleDeleteCustomer = (id) => {
    if (!window.confirm('Delete this customer?')) {
      return
    }
    setCustomers((current) => current.filter((customer) => customer.id !== id))
    if (selectedCustomerId === id) {
      setSelectedCustomerId(null)
    }
  }

  const handleSelectCustomer = (id) => {
    setSelectedCustomerId(id)
    // Load previous due for this customer
    const customer = customers.find(c => c.id === id)
    setPreviousDue(customer?.previousDue || 0)
  }

  const handleSaveMemo = async () => {
    if (!selectedCustomer) {
      window.alert('Please select a customer before saving the memo.')
      return
    }

    if (items.length === 0 && payments.length === 0) {
      window.alert('Please add at least one item or payment.')
      return
    }

    const memo = {
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      memoDate,
      previousDue: safeNumber(previousDue),
      items: items.filter(item => item.name.trim() && item.amount > 0),
      payments: payments.filter(payment => payment.description.trim() && payment.amount > 0),
      totals: { itemsTotal, totalPaid, previousDue: safeNumber(previousDue), remainingBalance },
    }

    const savedMemo = await saveMemoToFile(memo, memoHistory)
    if (savedMemo) {
      setMemoHistory(prev => [savedMemo, ...prev])
      
      // Update customer's previous due with new balance
      const updatedCustomers = customers.map(c => 
        c.id === selectedCustomer.id 
          ? { ...c, previousDue: remainingBalance }
          : c
      )
      setCustomers(updatedCustomers)
      
      window.alert('Memo saved to history!')
    }
  }

  const handleDownloadPdf = () => {
    downloadCashMemoPdf({
      store,
      customer: selectedCustomer || { name: '', phone: '', date: memoDate },
      items,
      payments,
      previousDue: safeNumber(previousDue),
      totals: { itemsTotal, totalPaid, previousDue: safeNumber(previousDue), remainingBalance },
    })
    
    // Auto-save to history when downloading PDF
    if (selectedCustomer && (items.length > 0 || payments.length > 0)) {
      handleSaveMemo()
    }
  }

  const handleExportData = () => {
    exportAllData()
  }

  const handleImportData = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const data = await importData(file)
      
      // Refresh state with imported data
      if (data.customers) setCustomers(data.customers)
      if (data.store) setStore(data.store)
      if (data.memos) setMemoHistory(data.memos)
      
      window.alert('Data imported successfully!')
    } catch (error) {
      window.alert(`Failed to import: ${error.message}`)
    }
    
    event.target.value = ''
  }

  return (
    <div className="min-h-screen bg-slate-50 px-3 lg:px-4 py-4 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-3 lg:space-y-4">
        

        <nav className="flex gap-1.5 lg:gap-2 rounded-xl lg:rounded-2xl bg-white p-2 lg:p-3 shadow-sm overflow-x-auto">
          {['memo', 'customers', 'store'].map((tab) => {
            const label = tab === 'memo' ? 'Memo' : tab === 'customers' ? 'Customers' : 'Store Settings'
            const selected = page === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setPage(tab)}
                className={`flex-shrink-0 rounded-lg lg:rounded-xl px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold transition ${
                  selected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 active:bg-slate-200'
                }`}
              >
                {label}
              </button>
            )
          })}
        </nav>

        {page === 'store' && (
          <StoreSettings store={store} onChange={setStore} />
        )}

        {page === 'customers' && (
          <CustomerManagement
            customers={customers}
            formCustomer={customerForm}
            onFormChange={setCustomerForm}
            onSave={handleSaveCustomer}
            onReset={() => setCustomerForm(initialCustomerForm)}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
          />
        )}

        {page === 'memo' && selectedCustomer && (
          <MemoPage
            store={store}
            selectedCustomer={selectedCustomer}
            customers={customers}
            memoDate={memoDate}
            onMemoDateChange={setMemoDate}
            previousDue={previousDue}
            onPreviousDueChange={setPreviousDue}
            onDownloadPdf={handleDownloadPdf}
            onPrint={() => window.print()}
            onSaveMemo={handleSaveMemo}
            items={items}
            payments={payments}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            onAddPayment={handleAddPayment}
            onUpdatePayment={handleUpdatePayment}
            onDeletePayment={handleDeletePayment}
            totals={{ itemsTotal, totalPaid, previousDue: safeNumber(previousDue), remainingBalance }}
            onSelectCustomer={handleSelectCustomer}
            memoHistory={getCustomerMemos(memoHistory, selectedCustomer.id)}
          />
        )}

        {page === 'memo' && !selectedCustomer && (
          <div className="rounded-xl lg:rounded-2xl bg-white p-6 lg:p-12 shadow-sm text-center">
            <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-2">Select a Customer</h3>
            <p className="text-sm lg:text-base text-slate-600 mb-6">Choose a customer from the list to create a memo</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3 max-w-4xl mx-auto">
              {customers.map((customer) => (
                <button
                  key={customer.id}
                  type="button"
                  onClick={() => handleSelectCustomer(customer.id)}
                  className="rounded-lg lg:rounded-xl border-2 border-slate-200 bg-slate-50 px-3 lg:px-4 py-2.5 lg:py-3 text-left hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100 transition"
                >
                  <p className="text-xs lg:text-sm font-semibold text-slate-900 truncate">{customer.name}</p>
                  <p className="text-[10px] lg:text-xs text-slate-600 mt-0.5">{customer.phone}</p>
                </button>
              ))}
              {customers.length === 0 && (
                <div className="col-span-full text-slate-500">
                  <p className="text-sm lg:text-base mb-4">No customers yet. Add one first!</p>
                  <button
                    type="button"
                    onClick={() => setPage('customers')}
                    className="rounded-lg lg:rounded-xl bg-blue-600 px-5 lg:px-6 py-2.5 lg:py-3 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition"
                  >
                    Add Customer
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
