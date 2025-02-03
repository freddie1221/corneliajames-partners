import { PDFDocument } from 'pdf-lib'

export async function combineShippingDocuments(documentUrls) {
  // Fetch PDF files
  const fileBuffers = await Promise.all(
    documentUrls.map(async (url) => {
      const response = await fetch(url)
      return {
        buffer: await response.arrayBuffer(),
        isImage: url.toLowerCase().endsWith('.png')
      }
    })
  )

  // Create a new PDF document
  const combinedPdf = await PDFDocument.create()
    // Load and copy pages from each file
    for (const {buffer, isImage} of fileBuffers) {
      if (isImage) {
        // Handle PNG
        const image = await combinedPdf.embedPng(buffer)
        const page = combinedPdf.addPage([image.width, image.height])
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        })
      } else {
        // Handle PDF (existing logic)
        const sourcePdf = await PDFDocument.load(buffer)
        const copiedPages = await combinedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())
        copiedPages.forEach((page) => combinedPdf.addPage(page))
      }
    }
  
  // Serialize the combined PDF
  return await combinedPdf.save()
}



export async function createShopifyStagedUpload(filename, fileBuffer) {

  // Create staged upload mutation
  const stagedUploadResponse = await fetch(`https://cornelia-james-ltd.myshopify.com/admin/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: `
        mutation UploadReturnLabel($input: [StagedUploadInput!]!) {
          stagedUploadsCreate(input: $input) {
            stagedTargets {
              url
              resourceUrl
              parameters {
                name
                value
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
      variables: {
        input: [{
          filename: filename,
          mimeType: 'application/pdf',
          httpMethod: 'POST',
          resource: 'RETURN_LABEL'
        }]
      }
    })
  })

  const stagedUploadData = await stagedUploadResponse.json()
  const stagedTarget = stagedUploadData.data.stagedUploadsCreate.stagedTargets[0]


  const uploadFile = async () => {
    const formData = new FormData();
    stagedTarget.parameters.forEach(param => formData.append(param.name, param.value));
    
    // Convert the buffer to a Blob with the correct MIME type
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    formData.append("file", blob);
  
    const response = await fetch(stagedTarget.url, {
      method: "POST",
      body: formData
    });
  
    if (response.ok) {
      return response
    } else {
      console.error("File upload failed", response.statusText);
    }
  };
  
  await uploadFile();

  return stagedTarget.resourceUrl
}

export default function ReturnLabelHandler() {
  async function processReturnLabel(documentUrls) {

    try {
      // Combine PDFs
      const combinedPdfBuffer = await combineShippingDocuments(documentUrls)

      // Upload to Shopify
      const shopifyFileUrl = await createShopifyStagedUpload(
        'combined-return-label.pdf', 
        combinedPdfBuffer
      )

      // console.log('Shopify File URL:', shopifyFileUrl)
      return shopifyFileUrl
    } catch (error) {
      console.error('Error processing return label:', error)
      throw error
    }
  }

  return {
    processReturnLabel
  }
}