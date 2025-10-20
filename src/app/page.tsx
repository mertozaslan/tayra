"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [pCount, setPCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const easterEggData = [
    { name: "Kaan", image: "/kaan.png", music: "/para.mp3" },
    { name: "Durmuş", image: "/durmus.jpeg", music: "/manifest.mp3" },
    { name: "Furkan", image: "/furkan.png", music: "/fino.mp3" }
  ];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'p') {
        setPCount(prev => {
          const newCount = prev + 1;
          if (newCount === 3) {
            setShowEasterEgg(true);
            setCurrentSlide(0);
            // İlk müziği çal
            const audioElement = new Audio(easterEggData[0].music);
            audioElement.play().catch(console.error);
            setAudio(audioElement);
            return 0; // Reset counter
          }
          return newCount;
        });
      }
      
      // Keyboard navigation for swiper
      if (showEasterEgg) {
        if (event.key === 'ArrowLeft') {
          const nextSlide = (currentSlide + 1) % easterEggData.length;
          setCurrentSlide(nextSlide);
          playMusic(easterEggData[nextSlide].music);
          console.log('Keyboard: Next slide to', nextSlide, easterEggData[nextSlide].name);
        } else if (event.key === 'ArrowRight') {
          const prevSlide = currentSlide === 0 ? easterEggData.length - 1 : currentSlide - 1;
          setCurrentSlide(prevSlide);
          playMusic(easterEggData[prevSlide].music);
          console.log('Keyboard: Prev slide to', prevSlide, easterEggData[prevSlide].name);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showEasterEgg, currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > 30;
    const isRightSwipe = distanceX < -30;
    const isUpSwipe = distanceY > 30;
    const isDownSwipe = distanceY < -30;

    console.log('Swipe detected:', { distanceX, distanceY, isLeftSwipe, isRightSwipe, showEasterEgg });

    if (showEasterEgg) {
      // Easter egg modunda swiper
      if (isLeftSwipe) {
        // Sola kaydır - sonraki slide
        const nextSlide = (currentSlide + 1) % easterEggData.length;
        setCurrentSlide(nextSlide);
        playMusic(easterEggData[nextSlide].music);
        console.log('Next slide:', nextSlide);
      } else if (isRightSwipe) {
        // Sağa kaydır - önceki slide
        const prevSlide = currentSlide === 0 ? easterEggData.length - 1 : currentSlide - 1;
        setCurrentSlide(prevSlide);
        playMusic(easterEggData[prevSlide].music);
        console.log('Prev slide:', prevSlide);
      }
    } else {
      // Normal modda eski sistem
      if (isUpSwipe) {
        setShowEasterEgg(true);
        setCurrentSlide(2); // Furkan
        playMusic('/fino.mp3');
      } else if (isDownSwipe) {
        setShowEasterEgg(true);
        setCurrentSlide(0); // Kaan
        playMusic('/para.mp3');
      }
    }
  };

  const playMusic = (musicPath: string) => {
    // Önceki müziği tamamen durdur ve temizle
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
      audio.load();
    }
    
    // Yeni müziği başlat
    const audioElement = new Audio(musicPath);
    audioElement.loop = false; // Tekrar etmesin
    audioElement.volume = 0.8; // Ses seviyesi
    audioElement.preload = 'auto';
    
    // Eski audio referansını temizle
    setAudio(null);
    
    // Yeni müziği başlat
    audioElement.play().then(() => {
      setAudio(audioElement);
      console.log('Playing music:', musicPath);
    }).catch((error) => {
      console.error('Music play error:', error);
    });
  };

  const closeModal = () => {
    setShowEasterEgg(false);
    // Müziği tamamen durdur ve temizle
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
      audio.load();
    }
    setAudio(null);
    console.log('Modal closed, music stopped');
  };

  return (
    <div 
      className="min-h-screen relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
      
      {/* Easter Egg Swiper */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-md">
            <Image
              src={easterEggData[currentSlide].image}
              alt={easterEggData[currentSlide].name}
              width={400}
              height={400}
              className="rounded-lg shadow-2xl w-full h-auto"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {easterEggData.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-white' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
            {/* Navigation buttons */}
            <button
              onClick={() => {
                const prevSlide = currentSlide === 0 ? easterEggData.length - 1 : currentSlide - 1;
                setCurrentSlide(prevSlide);
                playMusic(easterEggData[prevSlide].music);
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 rounded-full p-3 border-2 border-gray-300"
            >
              <svg className="w-8 h-8" fill="black" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            <button
              onClick={() => {
                const nextSlide = (currentSlide + 1) % easterEggData.length;
                setCurrentSlide(nextSlide);
                playMusic(easterEggData[nextSlide].music);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 rounded-full p-3 border-2 border-gray-300"
            >
              <svg className="w-8 h-8" fill="black" viewBox="0 0 24 24">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
              </svg>
            </button>

            {/* Swipe instructions with icons */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-75 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Swipe or use arrows</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
