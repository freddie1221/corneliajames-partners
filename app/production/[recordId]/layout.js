
import Header from "@/components/header";
import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  title: "Cornelia James Production",
  description: "Some useful resources",
};

export default function RootLayout({ children }) {
  return (
    <main>
      {children}
    </main>
  );
}
