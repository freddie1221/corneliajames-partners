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
    <>
      <Script src="https://integrations.missiveapp.com/missive.js" strategy="beforeInteractive" />
      <link 
        rel="stylesheet" 
        href="https://integrations.missiveapp.com/missive.css"
      />
      {children}
    </>
  );
}