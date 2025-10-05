import { DonacionForm } from './DonacionForm';

export default function DonarPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Dona Insumos Médicos
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tu donación de insumos como sillas de ruedas, muletas, camillas y
          otros equipos médicos es vital para pacientes que no pueden
          costearlos. Ayúdanos a mejorar su calidad de vida.
        </p>
      </div>
      <DonacionForm />
    </div>
  );
}
