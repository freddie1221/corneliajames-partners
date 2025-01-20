
import base from '@/app/production/lib/airtable/airtable';


export async function getGlovemakers() {
  const glovemakers = await base('People').select({
    filterByFormula: 'AND({Glovemaker} = 1, {Active} = 1)',
    sort: [{field: 'Name', direction: 'asc'}],
    fields: ['Name']
  }).all()
  return glovemakers.map(glovemaker => glovemaker.fields.Name)
}

export async function getReviewers() {
  const reviewers = await base('People').select({
    filterByFormula: 'AND({Operations} = 1, {Active} = 1)',
    sort: [{field: 'Name', direction: 'desc'}],
    fields: ['Name']
  }).all()
  return reviewers.map(reviewer => reviewer.fields.Name)
}