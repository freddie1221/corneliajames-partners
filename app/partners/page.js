import Link from 'next/link';

export default function Home() {
  const menuItems = [
    {
      href: '/products',
      title: 'Product Gallery',
      description: 'Cornelia James Product Library',
    },
    {
      href: '/product-table',
      title: 'Product Data',
      description: 'Product Data Grid & CSV Download',
    },
    {
      href: '/brand-guide',
      title: 'Brand Guide',
      description: 'Cornelia James Brand Guide',
    },
    {
      href: 'https://www.corneliajames.com',
      title: 'Our Website',
      description: 'corneliajames.com',
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center p-8 my-18">
      <div className="grid gap-6 w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {menuItems.map((item, index) => (
          <MenuCard
            key={index}
            href={item.href}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </main>
  );
}

function MenuCard({ href, title, description }) {
  return (
    <Link
      href={href}
      className="group border border-gray-300 p-6 rounded-xl hover:shadow-md transition-all duration-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors flex items-center justify-between">
        {title}
        <span className="text-gray-400 group-hover:translate-x-1 transition-transform duration-200">
          →
        </span>
      </h2>
      <p className="mt-2 text-gray-600 text-sm">
        {description}
      </p>
    </Link>
  );
}