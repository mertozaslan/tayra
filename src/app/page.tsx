import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <Image
          src="/bg.png"
          alt="Tayra Interactive - Her işte bir iz, her izde bir hikaye"
          width={800}
          height={600}
          priority
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
