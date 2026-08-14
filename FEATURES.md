# Cash Memo Application - Feature Guide

## ✨ New Features

### 1. **Side-by-Side Layout**
- **Dashboard/Memo Page**: Store owner info and customer info are now displayed side by side, saving valuable screen space
- **PDF Export**: Store and customer information are arranged horizontally for a more compact layout

### 2. **Persistent Data Storage**
All your data is automatically saved and never lost:

#### **LocalStorage (Browser)**
- Store settings
- Customer list
- Current memo state
- Memo history (last 100 memos)

#### **Automatic JSON Backups**
- Customers are auto-saved to `customers.json`
- Memo history is auto-saved to `memo-history.json`
- Complete backups can be downloaded with one click

### 3. **Memo History Tracking**
- Every PDF download automatically saves the memo to history
- Manual "Save Memo" button for saving without downloading
- View memo history in the sidebar (toggle between Customers and History)
- History shows:
  - Customer name
  - Memo date
  - Total items amount
  - Total paid
  - Balance due (color-coded: red for pending, green for cleared)
- History is organized by customer

### 4. **Data Management**

#### **Export Backup**
Click "Export Backup" button to download a complete JSON file containing:
- Store information
- All customers
- Complete memo history
- Export timestamp

File format: `cash-memo-backup-YYYY-MM-DD.json`

#### **Data Persistence**
- All changes are auto-saved to localStorage
- Data persists across browser sessions
- No data loss even if you close the browser

### 5. **Improved PDF Format**
- Currency displayed as "Tk" instead of special symbols (better compatibility)
- Store and customer info side by side
- Compact layout fits on one A4 page
- Row numbers for items and payments
- Date columns for tracking when items/payments occurred
- Color-coded totals in summary

## 📊 How to Use

### **Creating a Memo**
1. Select a customer from the left sidebar
2. Store info and customer info appear side by side at the top
3. Add items on the left side (name, date, amount)
4. Add payments on the right side (description, date, amount)
5. View totals at the bottom

### **Saving Memos**
- **Option 1**: Click "Save Memo" to save to history
- **Option 2**: Click "Download PDF" (automatically saves to history)
- Saved memos appear in the History view (toggle in sidebar)

### **Viewing History**
1. Click "History (#)" in the sidebar
2. Browse all saved memos
3. See customer name, date, and balance status
4. Click "Show Customers" to return to customer list

### **Backing Up Data**
1. Click "Export Backup" in the header
2. Downloads a JSON file with all your data
3. Keep this file safe for backup purposes
4. Shows count: "X customers • Y memos saved"

## 🔧 Technical Details

### Storage Structure

**LocalStorage Keys:**
- `cash-memo-app-state`: Current app state (store, customers, current memo)
- `cash-memo-history`: Memo history (last 100 memos)

**Memo History Entry:**
```json
{
  "id": "unique-id",
  "customerId": "customer-id",
  "customerName": "John Doe",
  "customerPhone": "0123456789",
  "memoDate": "2026-08-06",
  "items": [...],
  "payments": [...],
  "totals": {
    "itemsTotal": 1000,
    "totalPaid": 500,
    "remainingBalance": 500
  },
  "savedAt": "2026-08-06T10:30:00Z"
}
```

### Automatic History Limit
- Keeps only the last 100 memos
- Older memos are automatically removed
- Prevents unlimited growth

## 🎨 UI Improvements

### Minimal Design
- Reduced border radius (rounded-xl instead of rounded-3xl)
- Subtle shadows (shadow-sm)
- Compact spacing
- Clean color scheme

### Side-by-Side Layout Benefits
- Saves vertical space
- Better use of wide screens
- More professional appearance
- Fits more content on one page

## 💡 Tips

1. **Regular Backups**: Click "Export Backup" regularly to save your data externally
2. **History Toggle**: Use the history view to quickly check past memos for a customer
3. **Auto-Save**: Don't worry about losing data - everything is saved automatically
4. **PDF Downloads**: Each PDF download creates a history entry automatically
5. **Customer Management**: Add customers first, then create memos for them

## 🔒 Data Safety

- All data stored locally in your browser
- No data sent to external servers
- LocalStorage persists across sessions
- JSON backups provide additional security
- No risk of data loss with proper backups
