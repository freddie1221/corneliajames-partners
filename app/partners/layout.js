
import Header from "@/components/header";
import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  title: "Cornelia James for partners",
  description: "Some useful resources",
};

export default function PartnersLayout({ children }) {
  return (

        <main>
          <Header />
          {children}
        </main>
    
  );
}
