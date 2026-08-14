const PDFButton = ({ onDownload, onPrint }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onPrint}
        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Print
      </button>
      <button
        type="button"
        onClick={onDownload}
        className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  )
}

export default PDFButton
