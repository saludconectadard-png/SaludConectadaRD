'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    image: '/image1.jpg',
    title: 'Tu salud, nuestra prioridad',
    description: 'Reserva tu cita médica de forma rápida y segura en solo unos clics.',
    buttonText: 'Agendar cita',
    buttonLink: '/citas',
  },
  {
    image: '/image2.jpg',
    title: 'Únete y transforma vidas',
    description: 'Conviértete en voluntario y marca la diferencia en la vida de quienes más lo necesitan',
    buttonText: 'Quiero ser Voluntario',
    buttonLink: '/voluntarios',
  },
  {
    image: '/image5.jpg',
    title: 'Tu apoyo hace la diferencia',
    description: 'Contribuye con equipos médicos y mejora la calidad de vida de pacientes vulnerables.',
    buttonText: 'Haz la diferencia',
    buttonLink: '/donar',
  },
    {
    image: '/image7.jpg',
    title: 'Sé el Latido que Necesitan',
    description: 'Estamos preparando un programa especial para que puedas salvar vidas con tu donación de sangre. ¡Mantente atento y sé parte del cambio!',
    buttonText: 'Avisarme',
    buttonLink: '/donar',
  },
];

const AUTO_INTERVAL = 12000; // 12 segundos

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState<number[]>(slides.map(() => 0));
  const isPaused = useRef(false);
  const intervalRef = useRef<number | null>(null);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goToSlide = (index: number) => setCurrent(index);

  // Auto slide con progresión de bolita
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let elapsed = 0;
    const step = 100; // cada 100ms
    intervalRef.current = window.setInterval(() => {
      if (!isPaused.current) {
        elapsed += step;
        const newProgress = Math.min((elapsed / AUTO_INTERVAL) * 100, 100);
        setProgress((prev) =>
          prev.map((p, i) =>
            i < current ? 100 : i === current ? newProgress : 0
          )
        );

        if (elapsed >= AUTO_INTERVAL) {
          nextSlide();
          elapsed = 0;
        }
      }
    }, step);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [current]);

  return (
    <div
      className="relative w-full h-screen"
      onMouseDown={() => (isPaused.current = true)}
      onMouseUp={() => (isPaused.current = false)}
      onTouchStart={() => (isPaused.current = true)}
      onTouchEnd={() => (isPaused.current = false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: index === current ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay oscuro permanente */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          {/* Degradado solo en la parte inferior de la imagen */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent z-20" />
        </div>
      ))}

      {/* Contenido del slide */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-6 z-30">
        <h1 className="font-headline text-4xl font-bold sm:text-6xl xl:text-7xl">
          {slides[current].title}
        </h1>
        <p className="mt-4 max-w-[700px] text-lg md:text-xl">
          {slides[current].description}
        </p>
        <a
          href={slides[current].buttonLink}
          className="mt-6 inline-block rounded bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition"
        >
          {slides[current].buttonText}
        </a>
      </div>

      {/* Flechas */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 z-40"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 z-40"
      >
        <ChevronRight size={30} />
      </button>

      {/* Bolitas con spinner gradual */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-40">
        {slides.map((_, index) => (
          <div key={index} className="relative h-4 w-4">
            <svg className="rotate-[-90deg]" viewBox="0 0 36 36">
              <circle
                className="text-gray-400"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                cx="18"
                cy="18"
                r="16"
              />
              <circle
                className="text-blue-500 transition-all duration-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                cx="18"
                cy="18"
                r="16"
                strokeDasharray="100"
                strokeDashoffset={100 - progress[index]}
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;