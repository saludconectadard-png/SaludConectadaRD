'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import OpinionesCarousel from '@/components/OpinionesCarousel';

interface Opinion {
  nombre: string;
  clinica: string;
  comentario: string;
}

export default function OpinionesPage() {
  const [nombre, setNombre] = useState('');
  const [clinica, setClinica] = useState('');
  const [comentario, setComentario] = useState('');
  const [opiniones, setOpiniones] = useState<Opinion[]>([]);

  // Cargar opiniones desde localStorage al inicio
  useEffect(() => {
    const stored = localStorage.getItem('opiniones');
    if (stored) setOpiniones(JSON.parse(stored));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !clinica || !comentario) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const nuevaOpinion: Opinion = { nombre, clinica, comentario };
    const nuevasOpiniones = [nuevaOpinion, ...opiniones];
    setOpiniones(nuevasOpiniones);
    localStorage.setItem('opiniones', JSON.stringify(nuevasOpiniones));

    // Reset form
    setNombre('');
    setClinica('');
    setComentario('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <main className="flex-grow container mx-auto px-6 py-8">
        {/* Título */}
        <h1 className="text-4xl font-bold mb-2 text-center text-blue-600 dark:text-blue-400">
          Deja tu Opinión
        </h1>

        {/* Texto motivador */}
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Tu opinión sobre cómo fue tu proceso de agendar y asistir a tu cita
          es muy importante para nosotros. También puedes conocer la experiencia de otros pacientes.
        </p>

        {/* Carrusel */}
        {opiniones.length > 0 && (
          <div className="mb-8">
            <OpinionesCarousel opiniones={opiniones} />
          </div>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4 transition-colors duration-500"
        >
          <Input
            placeholder="Nombre y Apellido"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={clinica}
            onChange={(e) => setClinica(e.target.value)}
          >
            <option value="">Selecciona una clínica</option>
            <option value="Clínica Independencia">Clínica Independencia</option>
            <option value="Hospital Central">Hospital Central</option>
            <option value="Clínica San José">Clínica San José</option>
          </select>

          <Textarea
            placeholder="Escribe tu comentario..."
            rows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Enviar Opinión
          </Button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-12">
        © 2025 Salud Conectada RD — Todos los derechos reservados.
      </footer>
    </div>
  );
}
