import Image from 'next/image';
import AssignGlovemaker from '../components/AssignGlovemaker';
import ItemReview from '../components/ItemReview';
import getOrderItem from '@/app/production/lib/airtable/getOrderItem';
import Message from '../components/Message';

async function getItem(recordId) {
  const record = await getOrderItem(recordId);
  return record;
}

export async function generateMetadata({ params }) {
  const record = await getItem(params.recordId);
  return {
    title: record ? `${record.product} - ${record.option1} | Cornelia James Production` : 'Production Item Not Found',
    description: record ? `Production details for ${record.product} in ${record.material}` : 'Production item details',
  };
}

export default async function ProductionPage({ params }) {
  const [record, glovemakers, reviewers] = await Promise.all([
    getItem(params.recordId),
    GetGlovemakers(),
    GetReviewers()
  ]);

  console.log(record);

  if (!record) { return <Message message="Record not found" />; }
  
  return (
    <>
      <ItemDetails record={record} />
      <AssignGlovemaker record={record} glovemakers={glovemakers} />
      <ItemReview record={record} reviewers={reviewers} />
    </>
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


