import Image from 'next/image';
import AssignGlovemaker from './components/AssignGlovemaker';
import getProductionItem from '@/lib/airtable/getProductionItem';

export default async function ProductionPage({ params }) {
  const record = await getProductionItem(params.recordId);
  const glovemakers = await GetGlovemakers();
  
  if (!record) {
    return <div>Record not found</div>;
  }
  
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold my-4 text-center">{record.product} - {record.option1}</h1>
    
      <Image 
        src={record.imageUrl} 
        alt={record.product} 
        width={600} 
        height={600} 
        className="rounded-lg shadow-md mx-auto"
      />

      {attribute("Glove Size", record.option2)}
      {attribute("Upper Arm Fit", record.uaf)}
      {attribute("Elbow Fit", record.ebf)}
      {attribute("Index Finger Fit", record.iff)}
      {attribute("Enhancements", record.enhancements)}
      {attribute("Enhancement Detailing", record.enhancementDetailing)}
      {attribute("Other Detailing", record.otherDetailing)}
      {attribute("Glovemaker", record.makerName)}

      <AssignGlovemaker glovemakers={glovemakers} recordId={params.recordId} makerName={record.makerName}/>
    </div>
  );  
}

function attribute(name, value) {
  if (!value) {
    return null;
  }
  return <div className="flex flex-row bg-white p-4 rounded-lg w-full">
    <div className="text-gray-500 w-1/2">{name}</div>
    <div className="w-1/2">{value}</div>
  </div>
} 


import base from '@/lib/airtable/airtable';


async function GetGlovemakers() {
  const glovemakers = await base('People').select({
    filterByFormula: 'AND({Glovemaker} = 1)',
    sort: [{field: 'Name', direction: 'asc'}],
    fields: ['Name']
  }).all()
  return glovemakers.map(glovemaker => glovemaker.fields.Name)
}


