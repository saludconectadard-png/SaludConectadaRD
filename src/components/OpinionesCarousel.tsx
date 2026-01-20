'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Opinion {
  nombre: string;
  clinica: string;
  comentario: string;
}

interface Props {
  opiniones: Opinion[];
}

export default function OpinionesCarousel({ opiniones }: Props) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<boolean[]>(opiniones.map(() => false));
  const [likes, setLikes] = useState<( 'like' | 'dislike' | null )[]>(opiniones.map(() => null));
  const [likeCounts, setLikeCounts] = useState<number[]>(opiniones.map(() => 0));
  const [dislikeCounts, setDislikeCounts] = useState<number[]>(opiniones.map(() => 0));

  const prev = () => setIndex((prev) => (prev - 1 + opiniones.length) % opiniones.length);
  const next = () => setIndex((prev) => (prev + 1) % opiniones.length);

  const toggleExpand = (i: number) => {
    const newExpanded = [...expanded];
    newExpanded[i] = !newExpanded[i];
    setExpanded(newExpanded);
  };

  const handleLike = (i: number, type: 'like' | 'dislike') => {
    const newLikes = [...likes];
    const newLikeCounts = [...likeCounts];
    const newDislikeCounts = [...dislikeCounts];

    if (newLikes[i] === type) {
      // si da click nuevamente, quita el like/dislike
      newLikes[i] = null;
      if (type === 'like') newLikeCounts[i]--;
      else newDislikeCounts[i]--;
    } else {
      // si cambia de like a dislike o viceversa
      if (newLikes[i] === 'like') newLikeCounts[i]--;
      if (newLikes[i] === 'dislike') newDislikeCounts[i]--;
      newLikes[i] = type;
      if (type === 'like') newLikeCounts[i]++;
      else newDislikeCounts[i]++;
    }

    setLikes(newLikes);
    setLikeCounts(newLikeCounts);
    setDislikeCounts(newDislikeCounts);

    // Guardar por dispositivo
    localStorage.setItem('likes', JSON.stringify(newLikes));
    localStorage.setItem('likeCounts', JSON.stringify(newLikeCounts));
    localStorage.setItem('dislikeCounts', JSON.stringify(newDislikeCounts));
  };

  // Cargar likes guardados al inicio
  useEffect(() => {
    const storedLikes = localStorage.getItem('likes');
    const storedLikeCounts = localStorage.getItem('likeCounts');
    const storedDislikeCounts = localStorage.getItem('dislikeCounts');

    if (storedLikes) setLikes(JSON.parse(storedLikes));
    if (storedLikeCounts) setLikeCounts(JSON.parse(storedLikeCounts));
    if (storedDislikeCounts) setDislikeCounts(JSON.parse(storedDislikeCounts));
  }, []);

  const maxChars = 200;

  return (
    <div className="relative w-full flex flex-col items-center justify-center mb-12">
      {/* Flechas (solo en PC) */}
      <Button
        onClick={prev}
        className="hidden md:flex absolute left-[-1rem] top-1/2 -translate-y-1/2 bg-blue-500/70 text-white rounded-full shadow-lg hover:bg-blue-600/80 z-50 w-10 h-10 flex items-center justify-center backdrop-blur-md transition-transform duration-300 ease-out hover:scale-110 hover:-translate-x-2"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={next}
        className="hidden md:flex absolute right-[-1rem] top-1/2 -translate-y-1/2 bg-blue-500/70 text-white rounded-full shadow-lg hover:bg-blue-600/80 z-50 w-10 h-10 flex items-center justify-center backdrop-blur-md transition-transform duration-300 ease-out hover:scale-110 hover:translate-x-2"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Cards */}
      <div className="relative w-full flex justify-center items-center min-h-[400px]">
        {opiniones.map((opinion, i) => {
          const offset = i - index;
          const isActive = offset === 0;

          const scale = isActive ? 1 : 0.85;
          const translateX = offset * 80;
          const zIndex = isActive ? 30 : 10 - Math.abs(offset);
          const opacity = isActive ? 1 : 0.5;
          const blur = isActive ? '0px' : '12px';

          const displayText =
            opinion.comentario.length > maxChars && !expanded[i]
              ? opinion.comentario.slice(0, maxChars) + '...'
              : opinion.comentario;

          return (
            <Card
              key={i}
              className="absolute shadow-lg overflow-hidden transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity,
                filter: `blur(${blur})`,
                width: '24rem',
                maxHeight: expanded[i] && isActive ? '450px' : '350px',
              }}
            >
              <CardContent className="flex flex-col h-full pt-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {opinion.nombre[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{opinion.nombre}</span>
                    <span className="text-blue-500 text-sm">
                      Asistió a: {opinion.clinica}
                    </span>
                  </div>
                </div>

                <div className="flex-grow text-gray-900 dark:text-gray-100 overflow-auto transition-all duration-500 ease-out">
                  {displayText}
                  {opinion.comentario.length > maxChars && (
                    <button
                      onClick={() => toggleExpand(i)}
                      className="text-blue-500 ml-1 text-sm font-medium transition-transform duration-300 ease-out hover:scale-105"
                    >
                      {expanded[i] ? 'Leer menos' : 'Leer más'}
                    </button>
                  )}
                </div>

                {/* Likes/Dislikes */}
                <div className="flex items-center mt-2 space-x-4 text-sm">
                  <button
                    className={`flex items-center space-x-1 font-medium transition-colors duration-300 ${
                      likes[i] === 'like' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'
                    }`}
                    onClick={() => handleLike(i, 'like')}
                  >
                    <span>👍</span>
                    <span>{likeCounts[i]}</span>
                  </button>
                  <button
                    className={`flex items-center space-x-1 font-medium transition-colors duration-300 ${
                      likes[i] === 'dislike' ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'
                    }`}
                    onClick={() => handleLike(i, 'dislike')}
                  >
                    <span>👎</span>
                    <span>{dislikeCounts[i]}</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
