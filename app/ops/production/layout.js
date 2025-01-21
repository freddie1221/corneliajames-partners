


export const metadata = {
  title: "Cornelia James Production",
  description: "Some useful resources",
};

export default function ProductionLayout({ children }) {
  return (
    <main className="max-w-2xl mx-auto flex flex-col gap-3">
      {children}
    </main>
  );
}
