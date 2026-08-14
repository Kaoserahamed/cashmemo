# Storage System - GitHub Pages Compatible

## ✅ Perfect for GitHub Pages

This app uses **localStorage** exclusively - no backend needed! Works perfectly on GitHub Pages.

## How It Works

### 🔄 Automatic Persistence
- **Customers**, **Store Info**, and **Memo History** are automatically saved to browser's localStorage
- Data persists across page refreshes and browser restarts
- No manual saving required - everything auto-saves!

### 💾 LocalStorage Keys
```javascript
'cash-memo-customers'  // All customer data
'cash-memo-store'      // Store information
'cash-memo-memos'      // Memo history (last 100)
```

### 📤 Export/Import for Backup

#### Export Backup (Download JSON)
- Click "Export Backup" button in header
- Downloads complete backup: `cash-memo-backup-YYYY-MM-DD.json`
- Contains: customers, store, memos, export date

#### Import Backup (Restore from JSON)
- Click "Import Backup" button
- Select previously exported JSON file
- All data restored instantly!

## Data Flow

```
User Action → State Update → Auto-save to localStorage → Done!
                                        ↓
                            Page Refresh → Auto-load from localStorage
```

## Features

### ✅ Customers
- Auto-saves when you add/edit/delete
- Loads automatically on page refresh
- Never lost unless browser cache cleared

### ✅ Store Info
- Auto-saves when you change name/phone/address
- Persists across sessions

### ✅ Memos
- Saves up to 100 most recent memos
- Auto-saves when you click "Save Memo" or "Download PDF"
- Organized by customer

### ✅ Memo Page
- **Only shows when customer is selected**
- If no customer selected → Shows customer selection screen
- Must select customer before creating memo

### ✅ Items with Quantity & Unit Price
- Fields: Name*, Quantity*, Unit Price*, Amount*
- Auto-calculates: `Quantity × Unit Price = Amount`
- Can edit amount directly (resets calculation)
- Date field optional

## GitHub Pages Deployment

### 1. Build for Production
```bash
npm run build
```

### 2. Deploy to GitHub Pages
```bash
# dist folder contains the built app
# Push to gh-pages branch or configure in GitHub settings
```

### 3. Data Persistence
- Data stored in user's browser (localStorage)
- Each user has their own data
- Use Export/Import to share data between devices

## Benefits

✅ **No Backend Required** - Pure client-side  
✅ **GitHub Pages Compatible** - Static hosting  
✅ **Fast Performance** - Instant load/save  
✅ **Free Hosting** - GitHub Pages is free  
✅ **Offline Capable** - Works without internet after first load  
✅ **Privacy** - Data stays in user's browser  

## Usage Guide

### First Time
1. App loads with empty data
2. Add customers in "Customers" tab
3. Create memos in "Memo" tab (after selecting customer)
4. Everything auto-saves!

### Daily Use
1. Open app → Data loads automatically
2. Select customer → Create memo
3. Save/Download PDF → Memo added to history
4. All changes auto-saved!

### Backup
1. Click "Export Backup" regularly
2. Save JSON file somewhere safe
3. Import if needed (new device, cleared cache, etc.)

## Data Limits

- **Customers**: No limit (localStorage ~5-10MB)
- **Memos**: Keeps last 100 (auto-trims older ones)
- **Store**: Single store supported

## When Data is Lost

LocalStorage is cleared when:
- User clears browser cache
- Browser privacy mode/incognito (doesn't persist)
- Browser storage quota exceeded

**Solution**: Regular exports! Keep backup JSON files.

## Best Practices

1. **Export regularly** - Weekly or after important memos
2. **Keep backups** - Store JSON files in cloud/drive
3. **One device** - Or use import/export to sync
4. **Normal browsing** - Avoid incognito mode
5. **Don't clear cache** - Unless you have backup

## Troubleshooting

### Data disappeared?
- Check if browser cache was cleared
- Import last backup JSON file

### Can't see memo page?
- Select a customer first
- Customers tab → Add customer if none exist

### Import not working?
- Verify JSON file format
- Check file is from this app's export

### Storage full?
- Export and save JSON
- Clear old memo history
- Browser localStorage limit ~5-10MB

## Perfect for GitHub Pages! 🎉

No database, no API, no backend - just pure JavaScript and localStorage. Deploy anywhere static hosting is supported!
