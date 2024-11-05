import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/logo_solo.png"
            alt="Cornelia James"
            width={200}
            height={24}
            priority
          />
          <span className="text-lg font-mono">for Partners</span>
        </a>
      </div>
    </header>
  );
}