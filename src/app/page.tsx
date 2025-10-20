import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Desktop görseli */}
      <Image
        src="/bg.png"
        alt="Tayra Interactive - Her işte bir iz, her izde bir hikaye"
        fill
        priority
        className="object-cover hidden md:block"
      />
      {/* Mobil görseli */}
      <Image
        src="/responsive.png"
        alt="Tayra Interactive - Her işte bir iz, her izde bir hikaye"
        fill
        priority
        className="object-cover block md:hidden"
      />
    </div>
  );
}
