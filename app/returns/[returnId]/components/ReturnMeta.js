import React from 'react'
import useReturnMeta from '../../../../hooks/useReturnMeta'
import { Message, DetailItem } from '@/app/components/Elements/'


export default function ReturnMeta({ returnData }) {
  const { data, loading, error } = useReturnMeta(returnData.name)

  if (loading) {return <Message type="info" message="Loading Return Meta..." />}
  if (error) {return <Message type="error" message={`Error fetching return: ${error.message}`} />}
  if (!data) {return <Message type="error" message="No Return Meta available." />}


  return (
    <div className="flex justify-between">
      <DetailItem label="Return Type" value={data.Type} />
      <DetailItem label="Return Created at" value={ new Date(data['Created at']).toLocaleDateString()} />
      <DetailItem label="Return Credit Amount" value={`${data['Credit amount']} ${data.Currency}`} />
    </div>
  )
}