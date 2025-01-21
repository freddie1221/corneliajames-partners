
import Image from 'next/image';
import logo from '@/public/logo.png';

export const metadata = {
  title: "Cornelia James | Returns & Store Credit",
  description: "Our returns and store credit portal",
};

export default function OpsLayout({ children }) {
  return (
    <div className="">
      <main className="max-w-2xl mx-auto bg-gray-200 p-2">
        {children}
      </main>
    </div>
  )
}


function Header() {
  return (
    <header className="p-6 flex flex-col justify-center items-center gap-4 mb-4">
      <Image src={logo} alt="Cornelia James" width={300} height={100} />
      <h1 className="heading-primary">Returns & Store Credit</h1>
    </header>
  );
}