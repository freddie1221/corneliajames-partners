import { PDFDocument } from 'pdf-lib'

export async function combinePdfs(documentUrls) {
  // Fetch PDF files
  const pdfBuffers = await Promise.all(
    documentUrls.map(async (url) => {
      const response = await fetch(url)
      return response.arrayBuffer()
    })
  )

  // Create a new PDF document
  const combinedPdf = await PDFDocument.create()

  // Load and copy pages from each PDF
  for (const pdfBuffer of pdfBuffers) {
    const sourcePdf = await PDFDocument.load(pdfBuffer)
    const copiedPages = await combinedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())
    copiedPages.forEach((page) => combinedPdf.addPage(page))
  }

  // Serialize the combined PDF
  return await combinedPdf.save()
}