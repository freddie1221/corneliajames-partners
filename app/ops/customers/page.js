import Customer from './components/Customer'  

export default async function Customers({searchParams}) {
  // const email = (await searchParams).email
  return (
    <Customer />
  );
}