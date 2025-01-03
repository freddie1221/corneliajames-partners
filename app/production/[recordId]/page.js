import Image from 'next/image';
import AssignGlovemaker from './components/AssignGlovemaker';
import getProductionItem from '@/lib/airtable/getProductionItem';

export default async function ProductionPage({ params }) {
  const record = await getProductionItem(params.recordId);
  const glovemakers = await GetGlovemakers();
  
  if (!record) {
    return <div>Record not found</div>;
  }
  console.log(record);
  
  return (
    <div className="mx-auto flex flex-col gap-4">
      <div className="flex flex-col mb-3">
        <h1 className="text-2xl font-bold text-center">{record.product} - {record.option1}</h1>
        <h2 className="text-lg font-bold text-center">{record.material}</h2>
      </div>
    
      <Image 
        src={record.imageUrl} 
        alt={record.product} 
        width={600} 
        height={600} 
        className="rounded-lg shadow-md mx-auto"
      />

      {attribute("Glove Size", record.option2)}
      {attribute("Fit Summary", record.fitSummary)}
      {attribute("Length", record.length + " inches")}
      {attribute("Upper Arm Fit", record.uaf)}
      {attribute("Elbow Fit", record.ebf)}
      {attribute("Index Finger Fit", record.iff)}
      {attribute("Enhancements", record.enhancements )}
      {attribute("Enhancement Detailing", record.enhancementDetailing )}
      {attribute("Other Detailing", record.otherDetailing )}
      {attribute("Order Notes", record.orderNotes, "flex-col")}
      {attribute("Glovemaker", record.makerName)}

      <AssignGlovemaker glovemakers={glovemakers} recordId={params.recordId} makerName={record.makerName}/>
    </div>
  );  
}

function attribute(name, value, flexDirection = "flex-row") {
  if (!value) {
    return null;
  }
  if (Array.isArray(value)) {
    return( 
      <div className="flex flex-col row bg-white px-4 py-2 rounded-lg w-full">
        <div className="text-gray-500 w-full">{name}</div>
        <div className="w-full">
          {value.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    )
  }
  return( 
    <div className={`flex ${flexDirection} bg-white p-4 rounded-lg w-full`}>
      <div className="text-gray-500 w-full">{name}</div>
      <div className="w-full">{value}</div>
    </div>
  )
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


