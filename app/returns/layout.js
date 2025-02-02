import MixpanelInitializer from './lib/analytics/mixpanel'
import Image from 'next/image';
import logo from '@/public/logo.png';

export const metadata = {
  title: "Cornelia James | Returns & Store Credit",
  description: "Our returns and store credit portal",
};

export default function ReturnsLayout({ children }) {
  return (
    <div className="bg-gray-200">
      <Header />
      <main className="min-h-screen text-gray-800 font-avenir max-w-2xl mx-auto flex flex-col px-4 py-8 md:p-8">
        {children}
      </main>
      <MixpanelInitializer />
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