import { Inter } from "next/font/google";
import Header from "../components/header";
import "./globals.css";
import MixpanelInitializer from "@/lib/mixpanel";



export const metadata = {
  title: "Cornelia James for partners",
  description: "Some useful resources",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col p-8 bg-gray-100">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
