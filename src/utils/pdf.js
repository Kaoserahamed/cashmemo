import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Format currency
const formatPdfCurrency = (value) => {
  const amount = Number(value) || 0
  return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export const downloadCashMemoPdf = ({ store, customer, items, payments, previousDue, totals }) => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = 595
  const pageHeight = 842
  const margin = 40
  const contentWidth = pageWidth - (margin * 2)
  let y = margin

  // === HEADER SECTION ===
  // Store Name - Large and Bold
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(store.name || 'STORE NAME', margin, y)
  y += 20

  // Store Details
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`${store.phone || 'N/A'} | ${store.address || 'N/A'}`, margin, y)
  y += 20

  // Divider
  doc.setLineWidth(1)
  doc.line(margin, y, pageWidth - margin, y)
  y += 15

  // === CUSTOMER & DATE SECTION ===
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('CUSTOMER:', margin, y)
  doc.setFont('helvetica', 'normal')
  doc.text(customer.name || 'N/A', margin + 80, y)

  // Date on the right
  doc.setFont('helvetica', 'bold')
  const dateLabel = 'DATE:'
  const dateValue = customer.date || new Date().toLocaleDateString()
  const dateLabelWidth = doc.getTextWidth(dateLabel)
  const dateValueWidth = doc.getTextWidth(dateValue)
  doc.text(dateLabel, pageWidth - margin - dateLabelWidth - dateValueWidth - 10, y)
  doc.setFont('helvetica', 'normal')
  doc.text(dateValue, pageWidth - margin - dateValueWidth, y)
  y += 12

  // Customer Phone
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`Phone: ${customer.phone || 'N/A'}`, margin, y)
  y += 20

  // === ITEMS TABLE ===
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('ITEMS GIVEN', margin, y)
  y += 10

  const itemsData = items
    .filter((item) => item.name.trim() && item.amount > 0)
    .map((item, index) => [
      index + 1,
      item.name,
      item.quantity || '-',
      item.unitPrice ? `Tk ${formatPdfCurrency(item.unitPrice)}` : '-',
      `Tk ${formatPdfCurrency(item.amount)}`
    ])

  doc.autoTable({
    startY: y,
    head: [['#', 'Item Name', 'Qty', 'Unit Price', 'Amount']],
    body: itemsData,
    theme: 'grid',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center',
      cellPadding: 5,
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 5,
      textColor: [50, 50, 50],
    },
    columnStyles: {
      0: { cellWidth: 30, halign: 'center' },
      1: { cellWidth: 'auto', halign: 'left' },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 80, halign: 'right' },
      4: { cellWidth: 90, halign: 'right', fontStyle: 'bold' }
    },
    margin: { left: margin, right: margin },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  })

  y = doc.lastAutoTable.finalY + 10

  // Items Subtotal
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, y, contentWidth, 20, 'F')
  doc.text('SUBTOTAL:', margin + 10, y + 13)
  const subtotalText = `Tk ${formatPdfCurrency(totals.itemsTotal)}`
  const subtotalWidth = doc.getTextWidth(subtotalText)
  doc.text(subtotalText, pageWidth - margin - subtotalWidth - 10, y + 13)
  y += 35

  // === PAYMENTS TABLE ===
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('PAYMENTS RECEIVED', margin, y)
  y += 10

  const paymentsData = payments
    .filter((payment) => payment.description.trim() && payment.amount > 0)
    .map((payment, index) => [
      index + 1,
      payment.description,
      payment.date || '-',
      `Tk ${formatPdfCurrency(payment.amount)}`
    ])

  doc.autoTable({
    startY: y,
    head: [['#', 'Description', 'Date', 'Amount']],
    body: paymentsData,
    theme: 'grid',
    headStyles: {
      fillColor: [39, 174, 96],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center',
      cellPadding: 5,
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 5,
      textColor: [50, 50, 50],
    },
    columnStyles: {
      0: { cellWidth: 30, halign: 'center' },
      1: { cellWidth: 'auto', halign: 'left' },
      2: { cellWidth: 80, halign: 'center' },
      3: { cellWidth: 100, halign: 'right', fontStyle: 'bold' }
    },
    margin: { left: margin, right: margin },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  })

  y = doc.lastAutoTable.finalY + 10

  // Payments Total
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, y, contentWidth, 20, 'F')
  doc.text('TOTAL PAID:', margin + 10, y + 13)
  const paidText = `Tk ${formatPdfCurrency(totals.totalPaid)}`
  const paidWidth = doc.getTextWidth(paidText)
  doc.text(paidText, pageWidth - margin - paidWidth - 10, y + 13)
  y += 35

  // === SUMMARY SECTION ===
  doc.setLineWidth(1.5)
  doc.line(margin, y, pageWidth - margin, y)
  y += 15

  doc.setFontSize(11)
  const summaryLabelX = pageWidth - margin - 250
  const summaryValueX = pageWidth - margin - 20

  // Previous Due (if exists)
  if (previousDue > 0) {
    doc.setFont('helvetica', 'normal')
    doc.text('Previous Due:', summaryLabelX, y)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(255, 152, 0)
    const prevDueText = `Tk ${formatPdfCurrency(previousDue)}`
    const prevDueWidth = doc.getTextWidth(prevDueText)
    doc.text(prevDueText, summaryValueX - prevDueWidth, y)
    y += 15
    doc.setTextColor(0, 0, 0)
  }

  // Total Given
  doc.setFont('helvetica', 'normal')
  doc.text('Total Given:', summaryLabelX, y)
  doc.setFont('helvetica', 'bold')
  const totalGivenText = `Tk ${formatPdfCurrency(totals.itemsTotal)}`
  const totalGivenWidth = doc.getTextWidth(totalGivenText)
  doc.text(totalGivenText, summaryValueX - totalGivenWidth, y)
  y += 15

  // Total Paid
  doc.setFont('helvetica', 'normal')
  doc.text('Total Paid:', summaryLabelX, y)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(39, 174, 96)
  const totalPaidText = `Tk ${formatPdfCurrency(totals.totalPaid)}`
  const totalPaidWidth = doc.getTextWidth(totalPaidText)
  doc.text(totalPaidText, summaryValueX - totalPaidWidth, y)
  y += 15

  // Balance Due
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.text('Balance Due:', summaryLabelX, y)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  if (totals.remainingBalance > 0) {
    doc.setTextColor(231, 76, 60)
  } else {
    doc.setTextColor(39, 174, 96)
  }
  const balanceDueText = `Tk ${formatPdfCurrency(totals.remainingBalance)}`
  const balanceDueWidth = doc.getTextWidth(balanceDueText)
  doc.text(balanceDueText, summaryValueX - balanceDueWidth, y)
  
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  y += 25

  // === SIGNATURE ===
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Authorized Signature: ___________________________', margin, y)

  // === FOOTER ===
  doc.setFontSize(7)
  doc.setTextColor(150, 150, 150)
  doc.text('Thank you for your business!', pageWidth / 2, pageHeight - 25, { align: 'center' })

  doc.save('cash-memo.pdf')
}
