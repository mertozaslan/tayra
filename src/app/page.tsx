"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [pCount, setPCount] = useState(0);
  const [showDurmus, setShowDurmus] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'p') {
        setPCount(prev => {
          const newCount = prev + 1;
          if (newCount === 3) {
            setShowDurmus(true);
            // Ses çal
            const audioElement = new Audio('/manifest.mp3');
            audioElement.play().catch(console.error);
            setAudio(audioElement);
            return 0; // Reset counter
          }
          return newCount;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const closeDurmus = () => {
    setShowDurmus(false);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

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
      
      {/* Durmuş Easter Egg */}
      {showDurmus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <Image
              src="/durmus.jpeg"
              alt="Durmuş"
              width={400}
              height={400}
              className="rounded-lg shadow-2xl"
            />
            <button
              onClick={closeDurmus}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
