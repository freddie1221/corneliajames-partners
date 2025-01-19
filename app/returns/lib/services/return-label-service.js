import { combinePdfs } from '../utils/pdf-utils'
import { createStagedUpload } from '../utils/shopify-api'

export async function processReturnLabel(documentUrls) {
  try {
    // Combine PDFs
    const combinedPdfBuffer = await combinePdfs(documentUrls)

    // Upload to Shopify
    const shopifyFileUrl = await createStagedUpload(
      'combined-return-label.pdf', 
      combinedPdfBuffer
    )

    return shopifyFileUrl
  } catch (error) {
    console.error('Error processing return label:', error)
    throw error
  }
}