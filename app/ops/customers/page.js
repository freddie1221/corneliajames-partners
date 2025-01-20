"use client"

import getEmail from './utils/getEmail'

export default async function Customers({searchParams}) {
  const email = getEmail()
  return (
    <div>
      <p>Email: {email}</p>
    </div>
  );
}