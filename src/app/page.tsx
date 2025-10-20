import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <Image
          src="/tayra.jpeg"
          alt="Tayra Logo"
          width={600}
          height={400}
          priority
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
