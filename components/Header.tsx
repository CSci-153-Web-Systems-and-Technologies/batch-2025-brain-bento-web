import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center p-4 bg-[#f4f5e1] shadow-lg">
      <Image src="/logo.png" alt="BrainBento Logo" width={50} height={50} />
      <h1 className="ml-2 text-xl font-semibold  font-kaisei">BrainBento</h1>
    </header>
  );
}
