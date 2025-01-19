import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-primCol p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-secCol text-2xl heading-primary">Cornelia James</div>
        <div className="space-x-6">
          <Link href="/" className="text-secCol hover:text-white transition duration-300">
            Home
          </Link>
          <Link href="/products" className="text-secCol hover:text-white transition duration-300">
            Products
          </Link>
          <Link href="/product-data" className="text-secCol hover:text-white transition duration-300">
            Product Data
          </Link>
          <Link href="/brand-guide" className="text-secCol hover:text-white transition duration-300">
            Brand Guide
          </Link>
          <Link href="https://www.corneliajames.com" target="_blank" rel="noopener noreferrer" className="text-secCol hover:text-white transition duration-300">
            Our Website
          </Link>
        </div>
      </div>
    </nav>
  );
}