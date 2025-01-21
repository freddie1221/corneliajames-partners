import Script from 'next/script'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  other: {
    'X-Frame-Options': 'ALLOW-FROM https://app.missiveapp.com'
  }
}

export default function CustomersLayout({ children }) {
  return (
    <div className="flex flex-col font-avenir text-sm  min-h-screen p-2 bg-gray-200">
      <Script src="https://integrations.missiveapp.com/missive.js" strategy="beforeInteractive" />
      {children}
    </div>
  );
}
// max-w-2xl mx-auto bg-gray-200 p-2 min-h-screen

// <link rel="stylesheet" href="https://integrations.missiveapp.com/missive.css" />