import { CitaForm } from './CitaForm';

export default function CitasPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Gestión de Citas Médicas
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Complete el siguiente formulario para solicitar su cita. Nos pondremos
          en contacto con usted a la brevedad.
        </p>
      </div>
      <CitaForm />
    </div>
  );
}
