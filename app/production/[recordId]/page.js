import Image from 'next/image';
import AssignGlovemaker from '../components/AssignGlovemaker';
import ItemReview from '../components/ItemReview';
import getProductionItem from '@/app/production/lib/airtable/getProductionItem';

export default async function ProductionPage({ params }) {
  const record = await getProductionItem(params.recordId);
  const glovemakers = await GetGlovemakers();
  const reviewers = await GetReviewers();

  if (!record) {
    return <div>Record not found</div>;
  }
  
  return (
    <div className="mx-auto flex flex-col gap-4">
      <ItemDetails record={record} />
      <AssignGlovemaker 
        glovemakers={glovemakers} 
        record={record}
        productionRecordId={record.productionRecordId} 
        makerName={record.makerName}
      />
      <ItemReview record={record} reviewers={reviewers} />
    </div>
  );  
}

function ItemDetails({record}) {
  return(
    <>
      <div className="flex flex-col mb-3">
        <h1 className="text-3xl font-bold text-center">{record.product} - {record.option1}</h1>
        <h2 className="text-xl font-bold text-center">{record.material}</h2>
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
      {attribute("Reviewer", record.reviewer)}
      {attribute("Reviewer Notes", record.reviewerNotes, "flex-col")}
    </>
  )
}

function attribute(name, value, flexDirection = "flex-row") {
  if (!value) {
    return null;
  }
  if (Array.isArray(value)) {
    return( 
      <div className="flex flex-col row bg-white px-4 py-2 rounded-lg w-full">
        <div className="text-gray-700 w-full">{name}</div>
        <div className="w-full text-lg">
          {value.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    )
  }
  return( 
    <div className={`flex ${flexDirection} bg-white p-4 rounded-lg w-full`}>
      <div className="text-gray-700 w-full">{name}</div>
      <div className="w-full text-lg">{value}</div>
    </div>
  )
} 


import base from '@/app/production/lib/airtable/airtable';

async function GetGlovemakers() {
  const glovemakers = await base('People').select({
    filterByFormula: 'AND({Glovemaker} = 1, {Active} = 1)',
    sort: [{field: 'Name', direction: 'asc'}],
    fields: ['Name']
  }).all()
  return glovemakers.map(glovemaker => glovemaker.fields.Name)
}

async function GetReviewers() {
  const reviewers = await base('People').select({
    filterByFormula: 'AND({Operations} = 1, {Active} = 1)',
    sort: [{field: 'Name', direction: 'desc'}],
    fields: ['Name']
  }).all()
  return reviewers.map(reviewer => reviewer.fields.Name)
}


