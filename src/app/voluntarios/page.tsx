import { VoluntarioForm } from './VoluntarioForm';

export default function VoluntariosPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Únete a Nuestra Red de Voluntarios
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tu tiempo y dedicación pueden marcar una gran diferencia en la vida de
          muchos. ¡Gracias por considerar unirte a nuestro equipo!
        </p>
      </div>
      <VoluntarioForm />
    </div>
  );
}
