
import Header from "../components/header";
import "./globals.css";
import MixpanelInitializer from "@/lib/mixpanel";
import { Analytics } from "@vercel/analytics/react"




export const metadata = {
  title: "Cornelia James for partners",
  description: "Some useful resources",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col p-8 bg-gray-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
