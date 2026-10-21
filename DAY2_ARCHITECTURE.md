# Day 2 Architecture: Service Boundaries, Database Schema, API Contracts

## Repository
`cashmemo` — Cash management application (React + Vite + Tailwind, localStorage)

## Proposed Concept
Comprehensive cash management platform with multi-currency support, receipt OCR, expense categorization, budget alerts, financial reporting, and bank integration.

## Service Boundaries
| Service | Responsibility | Technology |
|---------|---------------|------------|
| Transaction Service | Income/expense entry, categorization, merchant, tags | Node.js/FastAPI, PostgreSQL |
| Account Service | Bank accounts, cash accounts, credit cards, digital wallets | Node.js/FastAPI, PostgreSQL |
| Budget Service | Monthly/weekly budgets, thresholds, alerts, rollover | Node.js/FastAPI, PostgreSQL |
| Reporting Service | Income statement, expense breakdown, cash flow, net worth | Node.js/FastAPI, PostgreSQL, charts |
| OCR Service | Receipt image upload, text extraction, merchant/amount/date parsing | Python, Tesseract/AWS Textract |
| Bank Integration Service | Plaid/Yodlee sync, automatic transaction import | Node.js, Plaid/Yodlee APIs |
| Frontend | React dashboard, transaction list, receipt upload, reports | React, Vite, Tailwind CSS |

## Database Schema (PostgreSQL)
- `users` — id, email, password_hash, currency_preference, timezone, created_at
- `accounts` — id, user_id, name, type (bank/cash/credit/wallet), opening_balance, current_balance, currency, created_at
- `transactions` — id, account_id, type (income/expense), amount, currency, date, category_id, merchant_id, notes, receipt_url, created_at
- `categories` — id, user_id, name, type (income/expense), color, parent_id, created_at
- `category_rules` — id, user_id, match_pattern, match_field (merchant/notes), category_id, priority, created_at
- `merchants` — id, name, logo_url, category_id, created_at
- `budgets` — id, user_id, category_id, period (monthly/weekly), amount, rollover, created_at
- `budget_alerts` — id, budget_id, threshold_pct, channel (email/push), enabled, created_at
- `receipts` — id, transaction_id, filename, url, ocr_text, ocr_confidence, merchant_extracted, amount_extracted, date_extracted, created_at
- `exchange_rates` — id, base_currency, target_currency, rate, source, fetched_at
- `bank_accounts` — id, user_id, provider (plaid/yodlee), access_token_encrypted, item_id, last_synced, created_at
- `savings_goals` — id, user_id, name, target_amount, deadline, current_amount, created_at

## API Contracts
### Transactions
- `GET /api/v1/transactions` → list (filters: date, category, account)
- `POST /api/v1/transactions` — {accountId, type, amount, date, categoryId, notes} → {transaction}
- `GET/PUT/DELETE /api/v1/transactions/{id}`
- `POST /api/v1/transactions/import` — {bankData} → {importedCount}

### Accounts
- `GET /api/v1/accounts` → list with balances
- `POST /api/v1/accounts` — {name, type, openingBalance, currency} → {account}
- `GET/PUT/DELETE /api/v1/accounts/{id}`

### Categories
- `GET /api/v1/categories` → list (tree)
- `POST /api/v1/categories` → {category}
- `GET /api/v1/categories/rules` → list
- `POST /api/v1/categories/rules` — {pattern, field, categoryId} → {rule}

### Receipts (OCR)
- `POST /api/v1/receipts/upload` — {file} → {receiptId, ocrResult}
- `POST /api/v1/receipts/{id}/match` — {transactionId} → 204
- `GET /api/v1/receipts/{id}/file` → file download

### Budgets
- `GET /api/v1/budgets` → list with spend vs budget
- `POST /api/v1/budgets` — {categoryId, period, amount, rollover} → {budget}
- `GET /api/v1/budgets/alerts` → list (threshold breaches)
- `PUT /api/v1/budgets/{id}/alerts` — {threshold, channel, enabled}

### Reports
- `GET /api/v1/reports/income-statement` — {startDate, endDate} → {statement}
- `GET /api/v1/reports/expense-breakdown` — {period, category} → {breakdown}
- `GET /api/v1/reports/cash-flow` → {flow}
- `GET /api/v1/reports/net-worth` → {netWorth, history}
- `GET /api/v1/reports/export` — {format (pdf/csv/excel)} → file

### Bank Integration
- `POST /api/v1/bank/connect` — {provider, credentials} → {linkToken}
- `POST /api/v1/bank/sync` → {syncedCount}
- `GET /api/v1/bank/status` → {lastSynced, status}

## Technical Notes
- Currently localStorage-only; no backend exists
- Multi-currency with exchange rate API (OpenExchangeRates/ECB)
- Receipt OCR with confidence scoring and matching
- Budget alerts with threshold notifications
- Bank sync with Plaid/Yodlee
- No authentication, no multi-device sync, no reporting yet

## Day 2 Outcome
Architecture design documented. No code changes. 0 PRs. Ready for Day 3 (CI/CD pipeline).