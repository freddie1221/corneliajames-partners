
export default async function Customers({searchParams}) {
  const email = (await searchParams).email
  return (
    <div>Email: {email}</div>
  );
}