'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HandHelping, Stethoscope, HeartHandshake } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from '@/components/ImageCarousel';
import { toast } from '@/hooks/use-toast';
import { APP_CONFIG, RESPONSE_MESSAGES } from '@/lib/constants';

export default function Home() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(APP_CONFIG.email);
    toast({
      title: 'Correo Copiado',
      description: RESPONSE_MESSAGES.SUCCESS.EMAIL_COPIED,
    });
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <section className="relative h-screen w-full overflow-hidden">
        <ImageCarousel />
      </section>

      <section
        id="sobre-nosotros"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 transition-colors duration-500"
      >
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white transition-colors duration-500">
                Nuestra Misión: Tecnología con Propósito Humano
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed transition-colors duration-500">
                Salud Conectada RD nació de la idea de que la tecnología puede y
                debe ser una herramienta para cerrar brechas sociales. Somos un
                equipo comprometido con mejorar el acceso a la salud en las
                comunidades más vulnerables de la República Dominicana. A través
                de la automatización y la creación de una red de solidaridad,
                conectamos a pacientes con la atención que necesitan y a
                voluntarios con la oportunidad de ayudar. Creemos en un futuro
                donde la salud sea un derecho accesible para todos, sin importar
                dónde vivan.
              </p>
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="/image6_nuevo.jpg"
                alt="Equipo de voluntarios de Salud Conectada RD"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Cómo Funciona
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                Un Proceso Sencillo en 3 Pasos
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hemos diseñado un sistema fácil de usar para que puedas obtener
                la ayuda que necesitas o contribuir a tu comunidad sin
                complicaciones.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Carta 1 */}
            <Card className="rounded-xl border-none text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/50 hover:ring-4 hover:ring-blue-400">
              <CardHeader>
                <div className="mx-auto w-fit rounded-full bg-primary p-4">
                  <Stethoscope className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="mt-4 font-headline">
                  1. Solicita
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pide tu cita médica o regístrate como voluntario a través de
                  nuestros formularios simples y seguros.
                </p>
              </CardContent>
            </Card>

            {/* Carta 2 */}
            <Card className="rounded-xl border-none text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/50 hover:ring-4 hover:ring-blue-400">
              <CardHeader>
                <div className="mx-auto w-fit rounded-full bg-primary p-4">
                  <HandHelping className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="mt-4 font-headline">
                  2. Procesamos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nuestro sistema inteligente procesa tu solicitud y la dirige
                  al centro de salud o coordinador de voluntarios adecuado.
                </p>
              </CardContent>
            </Card>

            {/* Carta 3 */}
            <Card className="rounded-xl border-none text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/50 hover:ring-4 hover:ring-blue-400">
              <CardHeader>
                <div className="mx-auto w-fit rounded-full bg-primary p-4">
                  <HeartHandshake className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="mt-4 font-headline">
                  3. Conectamos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Recibes confirmación y seguimiento por WhatsApp o email,
                  asegurando que recibas la ayuda o la oportunidad de ayudar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="contactanos"
        className="w-full py-12 text-center text-white md:py-24 lg:py-32"
        style={{ backgroundColor: '#007bff' }}
      >
        <div className="container flex flex-col items-center px-4 md:px-6">
          <h2 className="mb-4 font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
            ¿Tienes Preguntas o Sugerencias?
          </h2>
          <p className="mb-8 max-w-[700px] text-lg md:text-xl">
            Estamos aquí para ayudarte. Si tienes cualquier duda sobre nuestro
            funcionamiento, quieres proponer una colaboración o necesitas
            soporte, no dudes en escribirnos.
          </p>
          <button
            onClick={handleCopyEmail}
            className="mt-4 inline-block rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#007bff]"
          >
            {APP_CONFIG.email}
          </button>
        </div>
      </section>
    </div>
  );
}