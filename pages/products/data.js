import '../../app/globals.css';
// this query provides the product data
import { PRODUCTS_QUERY } from '../../queries/productsQuery';

export default function Data() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-center p-24">
     
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left flex justify-center items-center">

        <p>This page will statically render Cornelia James's product data, in a table format</p>
        <br />
        <p>There will be the option to download the data in CSV format</p>
        <br />
        <p>Reference file: <a href="https://docs.google.com/spreadsheets/d/1RXrFSg2J4PUONAAnDd2r8Akwy-pC3aDyIym4IEkfkPs/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="text-blue-500">https://docs.google.com/spreadsheets/d/1RXrFSg2J4PUONAAnDd2r8Akwy-pC3aDyIym4IEkfkPs/edit?gid=0#gid=0</a></p>

      </div>

  </main>

  )
}