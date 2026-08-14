// localStorage-based storage system
// Perfect for GitHub Pages - no backend needed!

const STORAGE_KEYS = {
  CUSTOMERS: 'cash-memo-customers',
  STORE: 'cash-memo-store',
  MEMOS: 'cash-memo-memos'
}

// Helper to safely get from localStorage
const getFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading ${key}:`, error)
    return defaultValue
  }
}

// Helper to safely save to localStorage
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error saving ${key}:`, error)
    return false
  }
}

// Load customers
export const loadCustomersFromFile = async () => {
  return getFromStorage(STORAGE_KEYS.CUSTOMERS, [])
}

// Save customers
export const saveCustomersToFile = async (customers) => {
  return saveToStorage(STORAGE_KEYS.CUSTOMERS, customers)
}

// Load store
export const loadStoreFromFile = async () => {
  return getFromStorage(STORAGE_KEYS.STORE, {
    name: 'My Store',
    phone: '',
    address: ''
  })
}

// Save store
export const saveStoreToFile = async (store) => {
  return saveToStorage(STORAGE_KEYS.STORE, store)
}

// Load memos
export const loadMemosFromFile = async () => {
  return getFromStorage(STORAGE_KEYS.MEMOS, [])
}

// Save memo to history
export const saveMemoToFile = async (memo, existingMemos) => {
  try {
    const newMemo = {
      ...memo,
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    }
    
    const updatedMemos = [newMemo, ...existingMemos].slice(0, 100)
    saveToStorage(STORAGE_KEYS.MEMOS, updatedMemos)
    
    return newMemo
  } catch (error) {
    console.error('Error saving memo:', error)
    return null
  }
}

// Get memos for specific customer
export const getCustomerMemos = (memos, customerId) => {
  return memos.filter(memo => memo.customerId === customerId)
}

// Export all data as JSON (for backup)
export const exportAllData = () => {
  const data = {
    customers: getFromStorage(STORAGE_KEYS.CUSTOMERS, []),
    store: getFromStorage(STORAGE_KEYS.STORE, {}),
    memos: getFromStorage(STORAGE_KEYS.MEMOS, []),
    exportedAt: new Date().toISOString(),
    version: '1.0'
  }
  
  const dataStr = JSON.stringify(data, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `cash-memo-backup-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

// Import data from JSON file
export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        if (data.customers) saveToStorage(STORAGE_KEYS.CUSTOMERS, data.customers)
        if (data.store) saveToStorage(STORAGE_KEYS.STORE, data.store)
        if (data.memos) saveToStorage(STORAGE_KEYS.MEMOS, data.memos)
        
        resolve(data)
      } catch (error) {
        reject(new Error('Invalid JSON file'))
      }
    }
    
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsText(file)
  })
}
