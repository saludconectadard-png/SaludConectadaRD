'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { donacionSchema, DonacionSchema } from '@/lib/schemas';
import { handleDonationSubmission } from '@/lib/actions';

export function DonacionForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<DonacionSchema>({
    resolver: zodResolver(donacionSchema),
    defaultValues: {
      nombreDonante: '',
      telefonoContacto: '',
      email: '',
      descripcionInsumo: '',
    },
  });

  function onSubmit(data: DonacionSchema) {
    startTransition(async () => {
      const result = await handleDonationSubmission(null, data);
      if (result.status === 'success') {
        toast({
          title: '¡Gracias por tu generosidad!',
          description:
            'Tu generosidad hace la diferencia. Gracias por tu donación, te contactaremos para coordinar la entrega.',
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Error en el registro',
          description: result.message,
        });
      }
    });
  }

  return (
    <Card className="mx-auto mt-8 max-w-2xl">
      <CardHeader>
        <CardTitle>Formulario de Donación</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nombreDonante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Donante</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Familia García / Empresa XYZ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefonoContacto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Teléfono de Contacto</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Ej. 809-123-4567"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ejemplo@correo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcionInsumo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del Insumo a Donar</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej. 1 silla de ruedas en buen estado, 2 pares de muletas."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Registrar Donación
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
