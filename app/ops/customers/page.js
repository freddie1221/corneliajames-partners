"use client"

import GetEmail from './utils/getEmail'

export default async function Customers({searchParams}) {
  const email = GetEmail()
  return (
    <div>
      <p>Email: {email}</p>
    </div>
  );
}