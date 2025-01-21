
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  title: "Cornelia James for partners",
  description: "Some useful resources",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
