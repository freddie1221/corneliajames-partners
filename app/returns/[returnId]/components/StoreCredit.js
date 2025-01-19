import Link from "next/link";

export default function StoreCredit({ returnData, returnType, storeCreditAmount, order }){

  if(returnType !== 'Credit') return null
  
  return (
    <>
      <div className="container bg-white rounded-lg p-5 md:p-8 space-y-4 flex flex-col items-center text-center gap-4">
        <div className="">
          <h2 className="heading-secondary">Store Credit</h2>
          <span className="">
            Your store credit has been automatically issued for the account associated with the email <span className="font-bold">{order.email}</span>.
            You should have received an email with the details.
          </span>
        </div>
          
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-light">Store Credit Hasn&apos;t Arrived?</h3>
          <span>If you don&apos;t receive an email notifying you of your store credit in a couple of minutes, click below to view your account where you should see it. Alternatively, please contact us.</span>
        </div>
        <div className="flex gap-4">
          <Link href="https://account.corneliajames.com/profile" className="btn btn-primary">View Account</Link>
          <button className="btn btn-tertiary">Contact Us</button>
        </div>
        
      </div>
    </>
  )
}