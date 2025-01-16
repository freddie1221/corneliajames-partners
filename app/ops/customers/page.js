"use client"
 
import { useSearchParams } from 'next/navigation'
 
export default function SearchBar() {
  const searchParams = useSearchParams()
 
  const customer = searchParams.get('customer')
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Customer: {customer}</>
}