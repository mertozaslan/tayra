import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Image
        src="/bg.png"
        alt="Tayra Interactive - Her işte bir iz, her izde bir hikaye"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
