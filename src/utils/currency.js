export const formatCurrency = (value) => {
  const amount = Number(value) || 0
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('₹', '৳')
}

export const parseAmount = (value) => {
  const cleaned = String(value).replace(/[^0-9.-]+/g, '')
  const parsed = Number(cleaned)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}
