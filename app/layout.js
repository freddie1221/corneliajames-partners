
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  title: "Cornelia James for partners",
  description: "Some useful resources",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col px-4 py-8 md:p-8 bg-gray-100 text-gray-900 ">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
