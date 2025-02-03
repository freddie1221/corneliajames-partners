

export default async function uploadLabel(filename, fileBuffer) {

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
  // Add error handling for staged upload
  if (stagedUploadData.errors || !stagedUploadData.data?.stagedUploadsCreate?.stagedTargets?.[0]) {
    throw new Error('Failed to create staged upload: ' + JSON.stringify(stagedUploadData.errors || stagedUploadData.data?.stagedUploadsCreate?.userErrors));
  }

  const stagedTarget = stagedUploadData.data.stagedUploadsCreate.stagedTargets[0]

  // Convert base64 to Buffer if input is base64
  const buffer = typeof fileBuffer === 'string' 
  ? Buffer.from(fileBuffer, 'base64')
  : fileBuffer;

  const uploadFile = async () => {
    const formData = new FormData();
    stagedTarget.parameters.forEach(param => formData.append(param.name, param.value));
    
    const blob = new Blob([buffer], { type: 'application/pdf' });
    formData.append("file", blob);

    const response = await fetch(stagedTarget.url, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`File upload failed: ${response.statusText}`);
    }
    
    return response;
  };
  
  await uploadFile();
  return stagedTarget.resourceUrl
}