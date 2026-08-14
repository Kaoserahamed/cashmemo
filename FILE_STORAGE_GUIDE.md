# File Storage System Guide

## How It Works

The Cash Memo app uses JSON files in the `public/data` folder for persistent storage, similar to how images are stored in a project.

## File Structure

```
CashMemo/
├── public/
│   └── data/
│       ├── customers.json      # Customer list
│       ├── memo-history.json   # All saved memos
│       └── store.json          # Store information
└── src/
    └── utils/
        └── fileStorage.js      # File handling logic
```

## How Data Persists

### 1. **Automatic Loading on Startup**
- When the app loads, it automatically fetches data from `public/data/*.json` files
- If files don't exist or are empty, the app starts fresh
- Data is cached in localStorage for faster access

### 2. **Automatic Saving**
- **Customers**: Auto-saves to `customers.json` whenever you add/edit/delete a customer
- **Store Info**: Auto-saves to `store.json` whenever you update store details
- **Memos**: Auto-saves to `memo-history.json` when you save a memo

### 3. **How Saving Works**
Since browsers can't directly write to the file system:
1. Data is saved to localStorage (instant)
2. File download is triggered automatically
3. You can save the downloaded file to `public/data/` folder to persist it

## Usage Workflow

### First Time Setup
1. Run the app - it will load empty data from `public/data/` files
2. Add customers, create memos
3. Downloaded files will appear in your Downloads folder
4. **Optional**: Copy downloaded files to `public/data/` to persist them

### Daily Usage
1. App loads data from `public/data/` automatically
2. All changes are auto-saved to localStorage
3. When you close and reopen, data persists from localStorage
4. Periodically replace `public/data/*.json` with downloaded versions for backup

## Features

### ✅ Customer Management
- Stored in `/data/customers.json`
- Auto-loads on refresh
- Always available after first creation

### ✅ Memo Creation
- Only shows when a customer is selected
- Can't create memo without selecting a customer
- Memo page hidden until customer selected

### ✅ Quantity & Unit Price
- Items support: Quantity × Unit Price = Amount
- Can edit amount directly (auto-calculates)
- All fields marked as required (*)

### ✅ Side-by-Side Layout
- Store info and Customer info displayed side by side
- Saves vertical space
- More professional look

## File Formats

### customers.json
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "phone": "0123456789",
    "note": "Regular customer"
  }
]
```

### store.json
```json
{
  "name": "My Store",
  "phone": "01234567890",
  "address": "123 Main Street, City"
}
```

### memo-history.json
```json
[
  {
    "id": "uuid",
    "customerId": "customer-uuid",
    "customerName": "John Doe",
    "customerPhone": "0123456789",
    "memoDate": "2026-08-06",
    "items": [
      {
        "id": "uuid",
        "name": "Rice",
        "date": "2026-08-06",
        "quantity": 2,
        "unitPrice": 500,
        "amount": 1000
      }
    ],
    "payments": [
      {
        "id": "uuid",
        "description": "Cash",
        "date": "2026-08-06",
        "amount": 500
      }
    ],
    "totals": {
      "itemsTotal": 1000,
      "totalPaid": 500,
      "remainingBalance": 500
    },
    "savedAt": "2026-08-06T10:30:00.000Z"
  }
]
```

## Benefits

1. **No Data Loss**: Files persist in project folder
2. **Easy Backup**: Just copy the `public/data` folder
3. **Version Control**: Can commit JSON files to git
4. **Easy Import/Export**: Standard JSON format
5. **Portable**: Works across different environments

## Troubleshooting

### Data Not Loading?
- Check if files exist in `public/data/`
- Verify JSON syntax is valid
- Check browser console for errors
- Try refreshing the page

### Data Not Persisting?
- LocalStorage might be cleared
- Copy downloaded files to `public/data/`
- Check browser localStorage limits

### Can't See Memo Page?
- You must select a customer first
- If no customer selected, you'll see a customer selection screen
- This is intentional - memos require a customer

## Pro Tips

1. **Backup Regularly**: Download and save files from `public/data/`
2. **Version Control**: Commit `public/data/*.json` to git for team sharing
3. **Multiple Environments**: Copy files between dev/prod for consistency
4. **Data Migration**: Use JSON files to move data between computers
